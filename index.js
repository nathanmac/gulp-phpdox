/*jshint node:true */

'use strict';

var map = require('map-stream'),
	gutil = require('gulp-util'),
	exec  = require('child_process').exec;

module.exports = function(command, config, opt) {
	var counter = 0;

	if (typeof command === 'object') {
		throw new gutil.PluginError("gulp-phpdox", "Invalid PHPDox Binary");
	}

	// if path to apigen bin not supplied, use default vendor/bin path
	if(! command) {
		command = 'phpdox';
	}

    if (config) {
        command += ' -f ' + config;
    }

	// create default opt object if no options supplied
	if ( ! opt) { opt = {}; }

	// assign default options if one is not supplied
	if (typeof opt.debug === 'undefined') { opt.debug = false; }
	if (typeof opt.clear === 'undefined') { opt.clear = false; }
	if (typeof opt.notify === 'undefined') { opt.notify = false; }

	return map(function (file, cb) {

		// construct command
		var cmd = opt.clear ? 'clear && ' + command : command;

		if(counter === 0) {
			counter++;

			cmd.trim(); // clean up any space remnants

			if (opt.debug) {
				gutil.log(gutil.colors.yellow('\n       *** Debug Cmd: ' + cmd + '***\n'));
			}

			exec(cmd, function (error) {

				if(opt.debug && error) {
					gutil.log(error);
				}

				if (opt.notify) {
					cb(error, file);
				} else {
					cb(null, file);
				}

			});
		}
	});

};

