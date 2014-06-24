module.exports = function(grunt){

  // configurable paths
  var config = {
      dev: 'dev',
      dist: 'dist'
  };
  // '<%= yeoman.app %>/*.html',


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    // COMPILE TASKS
    coffee: {
      glob_to_multiple: {
        expand: true,
        // flatten: true,
        cwd: 'src/',
        src: ['**/*.coffee'],
        dest: 'dev',
        ext: '.js',
      },
    },
    sass: {
      dist: {
        options: {
                style: 'expanded',
                lineNumbers: true
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.sass'],
          dest: 'dev',
          ext: '.css'
        }],
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [ {
          cwd: 'src',
          dest: 'dev',
          expand: true,
          src: '**/*.jade',
          ext: '.html',
        } ]
      }
    },
    // CONCAT into index.js
    // concat: {
    //   options: {
    //     separator: ';',
    //   },
    //   dist: {
    //     src: ['src/app.js', 'src/js/tazz.js'],
    //     dest: 'build/index.js',
    //   },
    // },

    // COPY TASKS
    copy: {
      // data: {
      //   expand: true,
      //   cwd: 'data',
      //   src: '**/*.json',
      //   dest: 'build/data/'
      // },

      // font_awesome_scss: {
      //   // needs to be copied into src/styles because paths
      //   expand: true,
      //   cwd: 'bower_components/font-awesome/scss',
      //   src: '*.scss',
      //   dest: 'src/styles/library/font-awesome'
      // },
      // font_awesome_fonts: {
      //   // needs to be copied into src/styles because paths
      //   expand: true,
      //   cwd: 'bower_components/font-awesome/fonts',
      //   src: '*.*',
      //   dest: 'build/assets/fonts/font-awesome'
      // },

      bower_components: {
      // bower components need to be available
      // TODO: instead set install path to dev with .bowerrc
        expand: true,
        cwd: 'bower_components',
        dest: 'dev/bower_components',
        src: '**/*',
      },

      // html: {
      //   expand: true,
      //   cwd: 'src/',
      //   src: '**/*.html',
      //   dest: 'build/',
      //   flatten: true,
      //   filter: 'isFile',
      // },

      // css: {
      //   expand: true,
      //   cwd: 'src/styles/',
      //   src: '**/*.css',
      //   dest: 'build/',
      //   flatten: true,
      //   filter: 'isFile',
      // },

    },


    // WATCH
    watch: {

      html: {
        files: ['src/**/*.html'],
        tasks: ['copy:html'],
      },
      // css: {
      //   files: ['src/**/*.css'],
      //   tasks: ['copy:css'],
      // },
      // js: {
      //   files: [ 'src/**/*.js'],
      //   tasks: ['concat:dist'],
      // },

      jade: {
        files: ['src/**/*.jade'],
        tasks: ['jade'],
      },

      coffee: {
        files: [ 'src/**/*.coffee' ],
        tasks: [ 'coffee' ],
      },
      sass: {
        files: 'src/**/*.sass',
        tasks: ['sass'],
      },
      // data: {
      //   files: 'data/**/*.*',
      //   tasks: 'copy:data'
      // },
      watch_build: {
        files: [
          'dev/**/*.html',
          'dev/**/*.js',
          // 'dev/assets/**',
        ],
        options: {
          livereload: true,
        },
      },
      watch_build_css: {
        files: [
          'dev/**/*.css'
        ]
      },
      livereload: {
        files: [
          'dev/**/*.css'
        ],
        options: {
          livereload: true
        }
      },
    },



  //   jshint: {
  //     all: [ 'Gruntfile.js', 'src/**/*.js' ]
  //   },

    // CONNECT SERVER
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'dev',
          open: true
        }
      }
    },


    // CONCURRENT FOR WATCH AND SERVE
    concurrent: {
        watch_serve_reload: ['server', 'watch'],
        options: {
                logConcurrentOutput: true
            }
    },

    // Grunt Icon:

    grunticon: {
      myIcons: {
              files: [{
                  expand: true,
                  cwd: 'icons',
                  src: ['*.svg'],
                  dest: "src/styles/library/icons"
              }],
          options: {
            datasvgcss: '_icons-data-svg.scss',
            datapngcss: '_icons-data-png.scss',
            urlpngcss: 'icons-fallback.css',
            cssprefix: '%icon-',
            defaultWidth: '128px',
            defaultHeight: '128px',
        }
      }
    },




  });

  grunt.registerTask('log', 'Log some stuff.', function () {
    grunt.log.write('Logging some stuff...').ok();
  });
  grunt.registerTask(
    'inital_compile', [
       'sass',
       'jade',
       'coffee',
       // 'concat',
       'copy'
        ]
  );

  grunt.registerTask('server', [ 'connect:server:keepalive' ]);
  grunt.registerTask('default', [ 'inital_compile', 'concurrent:watch_serve_reload' ]);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-coffee');
};
