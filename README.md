# Pure Html

Sometimes you just want to create a standard `index.html` with no dependencies, this little plugin helps you do just that with hot-reloading of html and css!

## Features

* Hot-reload html and css, makes development smoother.
* Inline styling, inlines your css and js.
* Html validation, make sure your html is valid html.
* Autoprefixer, apply browser specific prefixes for your css.

## Usage

```
  Usage: pure-html [options]

  A dev environment for creating standalone html files

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -c, --config [path]  Config file location
    -d, --dev            Start browsersync
    -s, --show-config    Show config used
    -f, --file [file]    Only watch specific file

  Order in which config is loaded:

  1. User manually enters path using -c option
  2. .purehtmlrc.json found in the current working directory
  3. .purehtmlrc.json found in the users home directory
  4. Default .purehtmlrc.json shipped with pure-html

  Examples:

    $ pure-html -d
    $ pure-html -c purehtml.json
    $ pure-html -f index.html
```

Additionally, I can recommend [Base 64 encoding](http://b64.io/) in-case you want to inline svg's.

## Development

Follows [Conventional Commits](https://conventionalcommits.org/).

