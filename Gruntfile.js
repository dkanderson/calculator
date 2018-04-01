'use strict';

/*global module:false*/
module.exports = function (grunt) {

    // Load all tasks
    require('load-grunt-tasks')(grunt);

    // Show elapsed time
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',


        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'grunfile.js',
                'src/assets/js/*.js'
            ]
        },

        processhtml: {
            build: {
                files: {
                    'dist/index.html': ['index.html']
                }
            }
        },

        watch: {
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint']
            },
            less: {
                files: [
                    'src/assets/less/*.less',
                    'src/assets/less/**/*.less'
                ],
                tasks: ['less:development']
            },
            options: {
              livereload: true
            }
        },
        less: {
            development: {
                    options: {
                        paths: ['src/assets']
                    },
                files: {
                  'src/assets/css/main.css': 'src/assets/less/main.less'
                }
            },
            production: {
                    options: {
                        paths: ['src/assets/css'],
                        plugins: [
                            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                            // new (require('less-plugin-clean-css'))(cleanCssOptions)
                        ]  
                    },
                files: {
                  'dist/assets/css/main.min.css': 'src/assets/less/main.less'
                }
            }
        },
        uglify: {
            options: {
                mangle: {
                    reserved: []
                }
            },
            my_target: {
                files: {
                    'dist/assets/js/calculator.min.js': ['src/assets/js/calc.js']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '/'
                }
              }
        }
              
    });

    // Register tasks
    grunt.registerTask('default', [
        'dev'
    ]);
     grunt.registerTask('connect', [
        'connect'
    ]);
    grunt.registerTask('dev', [
        'jshint',
        'less:development',
        'watch'
    ]);
    grunt.registerTask('build', [
        'jshint', 
        'less:production',
        'uglify',
        'processhtml'
    ]);

};