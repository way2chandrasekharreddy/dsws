/**
 * Copyright Avaya Inc., All Rights Reserved. THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 * Some third-party source code components may have been modified from their original versions by Avaya.
 * The modifications are Copyright Avaya Inc., All Rights Reserved. Avaya - Confidential & Restricted.
 * May not be distributed further without written permission of the Avaya owner.
 */

module.exports = function(grunt) {

  require('jit-grunt')(grunt);

  var config = {
    src_folder: 'src',
    widget_name: 'c3i-address-book',
    widget_folder: '<%= src_folder %>',
    build_folder: 'public',
    target_folder: 'bundle',
    compile_folder: '<%= target_folder %>',
    widget_files: {
      css: ['<%= widget_folder %>/**/*.css'],
      html: ['<%= widget_folder %>/**/*.html'],
      js: ['<%= widget_folder %>/**/*.js', '!<%= widget_folder %>/**/libs/*.js'],
      libs: ['<%= widget_folder %>/**/libs/*.js'],
      json: ['<%= widget_folder %>/**/*.json'],
      locale: ['<%= widget_folder %>/**/*.locale']
    }
  };

  var tasks = {

    clean: {
      build: {
        src: ['<%= build_folder %>'],
        options: { force: true }
      }
    },

    copy: {
      all: {
        files: [
          {
            src: ['<%= widget_files.js %>', '<%= widget_files.html %>', '<%= widget_files.libs %>', '<%= widget_files.css %>', '<%= widget_files.json %>', '<%= widget_files.locale %>'],
            dest: '<%= build_folder %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      json: {
        files: [
          {
            expand: true,
            cwd: '<%= widget_folder %>/',
            src: ['**/*.json'],
            dest: '<%= compile_folder %>/'
          }
        ]
      },
      libs: {
        files: [
          {
            expand: true,
            cwd: '<%= widget_folder %>/',
            src: ['**/libs/*.js'],
            dest: '<%= compile_folder %>/'
          }
        ]
      },
      assets: {
        files: [
          {
            expand: true,
            cwd: '<%= widget_folder %>/',
            src: ['assets/**'],
            dest: '<%= compile_folder %>/'
          }
        ]
      }

    },

    concat: {
      css: {
        src: ['<%= widget_files.css %>'],
        dest: '<%= compile_folder %>/<%= widget_name %>.css'
      },
      compile_js: {
        src: [
          '<%= build_folder %>/<%= widget_folder %>/**/*.tpl.js',
          '<%= build_folder %>/<%= widget_folder %>/**/*.js',
          '!<%= build_folder %>/<%= widget_folder %>/**/libs/*.js'
        ],
        dest: '<%= compile_folder %>/<%= widget_name %>.js',
        options: {
          banner: '(function ( window, angular, undefined ) {\n\n',
          footer: '})( window, window.angular );'
        }
      }
    },

    ngAnnotate: {
      compile: {
        files: [
          {
            src: ['<%= widget_files.js %>'],
            cwd: '<%= build_folder %>',
            dest: '<%= build_folder %>',
            expand: true
          }
        ]
      }
    },

    uglify: {
      compile: {
        files: {
          '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
        }
      }
    },

    sass: {
      all: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: {
          '<%= concat.css.dest %>': '<%= concat.css.dest %>'
        }
      }
    },

    html2js: {
      all: {
        src: ['<%= widget_files.html %>']
      }
    }
  };

  grunt.initConfig(grunt.util._.extend(tasks, config));

  grunt.registerTask('default', [
    'clean:build',
    'copy:all',
    'copy:libs',
    'copy:assets',
    'html2js',
    'ngAnnotate',
    'concat:compile_js',
    'copy:json',
    'concat:css',
    'sass:all',
    'uglify',
    'clean:build'
  ]);

  function filterForHTML(files) {
    return files.filter(function(file) {
      return file.match(/\.html$/);
    });
  }

  grunt.registerMultiTask('html2js', 'Convert HTML templates to JavaScript', function() {
    var dirRE = new RegExp('^(' + grunt.config('build_folder') + '|' + grunt.config('compile_folder') + ')\/', 'g');
    var htmlFiles = filterForHTML(this.filesSrc).map(function(file) {
      return file.replace(dirRE, '');
    });
    htmlFiles.forEach(function(filepath) {
      var content = grunt.file.read(filepath);
      content = 'var template= "' + content.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\n\r]/g, '\\n') + '";\n';
      filepath = filepath.replace(/.html/i, '.tpl.js');
      grunt.file.write(grunt.config('build_folder') + '/' + filepath, content);
    });
  });

};
