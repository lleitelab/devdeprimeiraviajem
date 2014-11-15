/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    bower : {
      path : "bower_components"
    },
    bootstrap : {
      path : {
        js : "<%= bower.path%>/bootstrap-sass-official/assets/javascripts/bootstrap.js",
        css : "<%= bower.path%>/bootstrap-sass-official/assets/stylesheets/"
      }
    },
    final_path : {
      js : "public/js",
      css : "public/assets/css"
    },
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> - <%= pkg.author.ref %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    copy : {
      jquery : {
        src : ' <%= bower.path %>/jquery/dist/jquery.min.map',
        dest : '<%= final_path.js %>/jquery.min.map'
      }
    },
    concat: {
      options: {
      },
      vendors: {
        src: [
          ' <%= bower.path %>/jquery/dist/jquery.min.js',
          '<%= uglify.bootstrap.dest %>'
        ],
        dest: '<%= final_path.js %>/vendor.min.js'
      }
    },
    uglify: {
      options: {
      },
      bootstrap: {
        src: '<%= bootstrap.path.js %>',
        dest: 'lib/script/bootstrap.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'inline'
        },
        files: {
          '<%= final_path.css%> main.min.css': 'lib/sass/main.scss'
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
//  grunt.registerTask('default', ['sass','jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('default', ['copy','sass', 'uglify', 'concat']);

};
