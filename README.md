# Pure Html

Sometimes you just want to create a standard `index.html` with no dependencies, this little plugin helps you do just that with hot-reloading of html and css!

## Features

* Autoprefixer
* Hot-reloading of HTML and CSS
* Html Validation
* Inline CSS

## Requirements

* Node 8 >=

## Usage

```
Usage: pure-html [options]

Command line tool for creating standalone html files


Options:

  -V, --version        output the version number
  -c, --config [path]  config file location
  -d, --dev            start browsersync
  -s, --show-config    show config used
  -i, --src [path]     Input path
  -f, --files [files]  only watch a specific file
  -o, --dest [path]    Output path
  -p, --port [port]    Port browswersync listens on
  -l, --html-lint      Invoke html lint
  -h, --help           output usage information
Config format:

  {
    "src": "src",    // Html source
    "dest": "dist",  // Html destination
    "port": 3001     // Listen on port
  }

Config priority order:

  1. manually entered config using -c option
  2. .purehtmlrc.json found in the current working directory
  3. .purehtmlrc.json found in the user home directory
  4. default .purehtmlrc.json shipped with pure-html

Examples:

  $ pure-html -d
  $ pure-html -c purehtml.json
  $ pure-html -f index.html
  $ pure-html -d -i input-folder -o output-folder -p 1337

```

Additionally, I can recommend [Base 64 encoding](http://b64.io/) in-case you want to inline svg's.

## Development

Follows [Conventional Commits](https://conventionalcommits.org/).

