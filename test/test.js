'use strict';

var gulpphpdox = require('../'),
    should     = require('should');

require('mocha');

describe('gulp-phpdox', function() {

		it('should not error if no parameters passed', function(done) {

			// Arrange
			var caughtErr;

			// Act
			try {
                gulpphpdox();
			} catch (err) {
				caughtErr = err;
			}
			// Assert
			should.not.exist(caughtErr);
			//caughtErr.message.indexOf('required').should.be.above(-1);
			done();
		});

		it('should throw error if object passed as first parameter', function(done) {

			// arrange
			var caughtErr;

			// act
			try {
                gulpphpdox({debug: true});
			} catch (err) {
				caughtErr = err;
			}

			// assert
			should.exist(caughtErr);

			done();

		});

});