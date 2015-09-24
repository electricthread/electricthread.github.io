module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['scss/**/*.{scss,sass}'],
        tasks: ['sass:dist']
      },
      coffee: {
        files: ['_coffee/**/*.coffee'],
        tasks: ['coffee:dist']
      },
      livereload: {
        files: [
          '*.php',
          'js/**/*.{js,json}',
          'css/*.css',
          'img/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'scss',
          src: '*.{scss,sass}',
          dest: 'css',
          ext: '.css'
        }]
      }
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '_coffee',
          src: '**/*.coffee',
          dest: 'js',
          ext: '.js'
        }]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img'
        }]
      }
    },
    grunticon: {
      myIcons: {
        files: [{
          expand: true,
          cwd: 'img/svg',
          src: ['*.svg', '*.png'],
          dest: "img/icons"
        }],
        options: {
          enhanceSVG: true
        }
      }
    }
  });
  grunt.registerTask('default', ['sass:dist', 'coffee:dist', 'imagemin', 'grunticon:myIcons', 'watch']);
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-grunticon');
};
