'use strict';

module.exports = function (grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Show elapsed time at the end
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        datetime: Date.now(),

        clean: ['dist'],

        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'dist/'
            },

            // copy autolinker
            autolinker: {
                expand: true,
                cwd: 'node_modules/autolinker/',
                src: 'dist/Autolinker.min.js',
                dest: ''
            }
        },

        convert: {
            options: {
                explicitArray: false
            },
            csv2json: {
                src: ['src/lawsuits.csv'],
                dest: 'dist/lawsuits.json'
            }
        },

        /* Run JSHint on our JS files */
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            }
        },

        /* Run JSONLint on our configuration files */
        jsonlint: {
            configFiles: {
                src: ['package.json', '.jshintrc']
            }
        },

        'gh-pages': {
            options: {
                base: 'src'
            },
            // These files will get pushed to the `gh-pages` branch (the default).
            src: ['dist/*']
        }
    });

    // Default task.

    grunt.registerTask('lint', ['jshint', 'jsonlint', 'travis-lint']);

    grunt.registerTask('build', ['clean', 'copy', 'convert']);

    grunt.registerTask('release', ['gh-pages']);

};
