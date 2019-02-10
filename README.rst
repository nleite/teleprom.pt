===========
teleprom.pt
===========

Serving subtitles since *2019*
------------------------------

``teleprom.pt`` is a simple localhost TCP server that serves the content of
``.srt`` files via the network.

This is a sample text streaming server for `MongoDB.local events <https://www.mongodb.com/local>`_

No other purposed intended!


Usage
-----

.. code-block:: sh

  teleprom.pt --help
  Prompt a srt file through the network.
  Usage: teleprom.pt [options] -f <file>

  Options:
    --help       Show help                                               [boolean]
    --version    Show version number                                     [boolean]
    --file, -f   path to the file to be prompt                 [string] [required]
    --speed, -s  prompt speed                                [number] [default: 1]
    --port, -p   server port                              [number] [default: 3999]

Build
-----

.. code-block:: sh

  npm build
  npm link


Examples
--------

**1**: Serve file ``subs/BbY0MfzfXhQ.srt`` and receive the results using netcat

* Start server on port **3999** (default) and set file ``subs/BbY0MfzfXhQ.srt``

  .. code-block:: sh

    teleprom.pt -f subs/BbY0MfzfXhQ.srt


* Receive the text information by connecting using ``netcat``

  .. code-block:: sh

    netcat 127.0.0.1 3999
