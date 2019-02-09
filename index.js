#!/usr/bin/env node

var fs = require('fs');
var parser = require('subtitles-parser')
var net = require('net')
var argv = require('yargs')

// parse command line args
argv
  .usage('Prompt a srt file through the network.\nUsage: $0 [options] -f <file>')
  .option('file', {
    alias: 'f',
    describe: 'path to the file to be prompt',
    type: 'string',
    demandOption: true
  })
  .option('speed',{
    alias: 's',
    describe: 'prompt speed',
    type: 'number',
    default: 1
  })
  .option('port',{
    alias: 'p',
    describe: 'server port',
    type: 'number',
    default: 3999
  });
var parsed = argv.parse()
let filename = parsed['file']
let speed = parsed['speed']
let port = parsed['port']
console.log("prompt speed: %d \n processing file %s \n listing on port %d",
  speed, filename, port);
let srt = "";
// use utf8 encoding by default
let encoding = 'utf8'
try{
  srt = fs.readFileSync(filename, encoding);

  var server = net.createServer();

  server.on('connection', processConnection);

  server.on('close', function(){
    console.log('closing server');
    server.unref();
  });

  server.listen(port, '127.0.0.1');
} catch(e){
  console.log('Error %s', e.message)
  process.exit(-1)
}


function processConnection(socket){
    let startTime = new Date().getTime()
    console.log('Start time: %d', startTime)

    var remoteAddress = socket.remoteAddress + ':' + socket.remotePort;
    console.log('new client connected: %s', remoteAddress);

    // in case of connection error or connection closed by client
    socket.on('error', function(err){
      console.log('Connection closed from %s due to %s',
        remoteAddress, err.message );
    });
    socket.on('close',  function () {
      console.log('connection from %s closed', remoteAddress);
    });

    let data = parser.fromSrt(srt, true);
    data.forEach(function(x){
      while(true){
        var ts = new Date().getTime() - startTime
        if( ts > (x['startTime']/speed)){
          socket.write(x['text'])
          socket.write("\n")
          break;
        }
      }
    })
    console.log('End time: %d', new Date().getTime())
}
