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
                src: ['bower.json', 'package.json', '.jshintrc']
            }
        },

        'gh-pages': {
            options: {
                base: 'src'
            },
            // These files will get pushed to the `gh-pages` branch (the default). 
            src: ['lawsuits.html', 'styles.css']
        }
    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'jsonlint', 'travis-lint', 'gh-pages']);
};
