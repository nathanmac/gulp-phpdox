# gulp-phpdox
> PHPDox plugin for gulp 3

## Usage

First, install `gulp-phpdox` as a development dependency:

```shell
npm install --save-dev gulp-phpdox
```

Then, add it to your `gulpfile.js`:

```javascript
var phpdox = require('gulp-phpdox');

// option 1: default format
gulp.task('phpdox', function() {
	gulp.src('phpdox').pipe(phpdox());
});

// option 2: with defined bin
gulp.task('phpdox', function() {
	gulp.src('phpdox').pipe(phpdox('phpdox', 'phpdox.xml'));
});

// option 3: supply callback to integrate something like notification (using gulp-notify)

var gulp = require('gulp'),
 notify  = require('gulp-notify'),
 phpdox  = require('gulp-phpdox');
 _       = require('lodash');

gulp.task('phpdox', function() {
  gulp.src('phpdox')
    .pipe(phpdox('phpdox', 'phpdox.xml.dist', {notify: true}))
    .on('error', notify.onError(APINotification('fail', 'phpdox')))
    .pipe(notify(APINotification('done', 'phpdox')));
});

function APINotification(status, pluginName, override) {
	var options = {
		title:   ( status == 'done' ) ? 'Docs Generated!' : 'Failed to Generate Docs!',
		message: ( status == 'done' ) ? '\n\nAPI Documentation has been generated!\n\n' : '\n\nDocumentation has failed to generate...\n\n',
		icon:    __dirname + '/node_modules/gulp-' + pluginName +'/assets/test-' + status + '.png'
	};
	options = _.merge(options, override);
  return options;
}
```

## API

### (phpdoxpath,configfile,options)

#### phpdoxpath

Type: `String`

The path to the desired PHPDox binary
- If not supplied, the default path will be phpdox

#### options.debug
Type: `Boolean (Default: false)`

Emit error details and shows command used in console

#### options.clear
Type: `Boolean (Default: false)`

Clear console before executing command

#### options.notify
Type: `Boolean (Default: false)`

Call user supplied callback to handle notification (use gulp-notify)

## Changelog

- 0.1.0: Initial Release

## Credits

gulp-phpdox written by Nathan Macnamara

E-Mail: [nathan.macnamara@outlook.com](mailto:nathan.macnamara@outlook.com)

Twitter: [@nathmacn](http://twitter.com/nathmacn)