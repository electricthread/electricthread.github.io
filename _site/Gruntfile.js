module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'assets/js/*.js', // All JS in the libs folder
                ],
                dest: 'assets/js/production.js',
            }
        },
        // uglify: {
        //     build: {
        //         src: 'assets/js/production.js',
        //         dest: 'assets/js/production.min.js'
        //     }
        // },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/img/'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'assets/css/screen.css': 'assets/scss/screen.scss'
                }
            }
        },
        jekyll: {
            server : {
                src : '**/*.{html,yml,md,mkd,markdown}',
                dest: 'dev',
                serve : true,
                auto : true
            },
            dev: {
                src: '**/*.{html,yml,md,mkd,markdown}',
                dest: '_site'
            },
            // prod: {
            //     src: 'templates',
            //     dest: 'prod'
            // }
        },
        watch: {
            livereload: {
                options: {
                  livereload: '<%= connect.options.livereload %>'
                },
                files: [
                  '_site/**/*.html',
                  'assets/css/**/*.css',
                  'assets/js/**/*.js',
                  'assets/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            },
            scripts: {
                files: ['assets/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['assets/scss/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            },
            jekyll: {
                files: [
                  'index.html',
                  '_config.yml'
                ],
                tasks: ['jekyll:dev']
            }
        },
        connect: {
          options: {
            port: 9000,
            livereload: 35729,
            // Change hostname to '0.0.0.0' to access the server
            // from another device on the same network (e.g. – iPhone)
            hostname: 'localhost'
          },
          livereload: {
            options: {
              open: true,
              middleware: function (connect) {
                return [
                  connect.static('.tmp'),
                  connect.static('._site'),
                ];
              }
            }
          }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-serve');

    grunt.registerTask('serve', function (target) {

        grunt.task.run([
          'connect:livereload',
          'watch'
        ]);
      });

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'imagemin', 'sass', 'watch', 'jekyll:server']);

};
