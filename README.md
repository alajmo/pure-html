# pure-html

Sometimes you just want to create a standard html file with no dependencies, this little plugin helps you do just that with hot-reloading of html and css!
**Go from this:**

*index.html*
```html
<!doctype html>
<html lang="en">
    <head>
        <link inline rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
        <link inline rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="non-inline-style.css">
    </head>

    <body>
        <div>
            Test
        </div>
        <script inline type="text/javascript" src="script.js"></script>
    </body>
</html>
```

*style.css*
```html
body, html {
    display: flex;
    background: blue;
}
```

*script.js*
```html
console.log('Hello World!');
```

**To this:**

*index.html*
```html
<!doctype html>
<html lang="en">
    <head>
        <style>@font-face{font-family:'Roboto';font-style:normal;font-weight:400;src:local('Roboto'),local('Roboto-Regular'),url(https://fonts.gstatic.com/s/roboto/v18/zN7GBFwfMP4uA6AR0HCoLQ.ttf) format('truetype')}</style>
        <style>body,html{display:-webkit-box;display:-ms-flexbox;display:flex;background:#00f}</style>
        <link rel="stylesheet" href="non-inline-style.css">
    </head>

    <body>
        <div>
            Test
        </div>
        <script type="text/javascript">console.log("hello world");</script>
    </body>
</html>
```

## Features

* Inline css and js
* Hot-reloading of html and css
* Css autoprefixer
* Html Validation

## Requirements

* Node 8 >=

## Usage

```txt

  Usage: pure-html [options]

  Command line tool for creating standalone html files.


  Options:

    -V, --version      output the version number
    -w, --watch        start browsersync. [boolean] [default: false]
    -s, --src [path]   source folder. [string] [default: current working directory]
    -d, --dest <path>  output folder. [string] [required]
    -p, --port [port]  port browswersync listens on. [integer] [default: 3000]
    -l, --html-lint    enable HTML lint. [boolean] [default: false]
    -h, --help         output usage information

  Examples:

    $ pure-html -w -p 8000 -s src -d dist
    $ pure-html -d output-folder

```

Additionally, I can recommend [Base 64 encoding](http://b64.io/) in-case you want to inline svg's.

## Development

Follows [Conventional Commits](https://conventionalcommits.org/).
