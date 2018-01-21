# pure-html

Sometimes you just want to create a standard `index.html` with no dependencies, this little plugin helps you do just that with hot-reloading of html and css!
Go from this:

**index.html**
```html
<!doctype html>
<html lang="en">
    <head>
        <link inline rel="stylesheet" href="style.css">
    </head>
    <body>
        <div>
            Test
        </div>
        <script inline type="text/javascript" src="script.js"></script>
    </body>
</html>
```

**style.css**
```html
body, html {
  position: flex;
  background: red;
}
```

**script.js**
```html
console.log('Hello World!');
```

To this:
**index.html**
```html
<!doctype html>
<html lang="en">
    <head>
        <style>body,html{background:#00f}</style>
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

* Autoprefixer
* Hot-reloading of HTML and CSS
* Html Validation
* Inline CSS / JS
* No inline CSS / JS

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
