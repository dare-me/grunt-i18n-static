const _ = require('lodash');
const staticI18n = require('@dare.me/static-i18n');

module.exports = function (grunt) {
    grunt.registerMultiTask('i18n', 'Translates static HTML', function () {
        const done = this.async();

        const options = this.options({
            selector: '[data-t]',
            useAttr: true,
            replace: false,
            locales: ['en'],
            fixPaths: true,
            locale: 'en',
            files: '**/*.html',
            exclude: [],
            allowHtml: false,
            baseDir: process.cwd(),
            removeAttr: true,
            outputDir: undefined,
            fileFormat: 'json',
            localeFile: '__lng__.__fmt__',
            outputDefault: '__file__',
            outputOther: '__lng__/__file__',
            localesPath: 'locales',
            outputOverride: {},
            encoding: 'utf8',
            i18n: {
                resGetPath: undefined,
                lng: undefined,
            },
        });

        staticI18n.processDir(options.baseDir, options)
            .then(done)
            .catch(function (err) {
                err.message = 'Failed to compile ' + err.message;
                grunt.log.error(err);
                grunt.fail.warn('i18n task failed');
            });
    });
};
