# Pure Html

Sometimes you just want to create a standard `index.html` with no dependencies, this little plugin helps you do just that with hot-reloading of html and css!

## Features

* Autoprefixer
* Hot-reloading of HTML and CSS
* Html Validation
* Inline CSS / JS
* No inline CSS / JS

## Requirements

* Node 8 >=

## Usage

```

  Usage: pure-html [options]

  Command line tool for creating standalone html files.


  Options:

    -V, --version      output the version number
    -w, --watch        start browsersync. Default false
    -s, --src <path>   source folder. Default current working directory
    -d, --dest <path>  destination folder. Required
    -p, --port <port>  port browswersync listens on. Default 3000
    -l, --html-lint    enable HTML lint. Default false
    -h, --help         output usage information

  Examples:

    $ pure-html -w -p 8000 -s src -d dist
    $ pure-html -d output-folder

```

Additionally, I can recommend [Base 64 encoding](http://b64.io/) in-case you want to inline svg's.

## Development

Follows [Conventional Commits](https://conventionalcommits.org/).

