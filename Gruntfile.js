module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      mangle: false
    },
    build: {
      src: 'client/dist/build_es5.js',
      dest: 'client/dist/build_min.js'
    },
  },
  concat: {
    options: {
      separator: ';',
    },
    dist: {
      src: ['client/app.js', 'client/*/*_controller.js', 'client/*/*_service.js'],
      dest: 'client/dist/build.js',
    },
  },
  babel: {
    options: {
      sourceMap: true,
      presets: ['es2015']
    },
    dist: {
      files: {
        'client/dist/build_es5.js': 'client/dist/build.js'
      }
    }
  }
});

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-babel');

// Default task(s).
grunt.registerTask('default', ['concat', 'babel', 'uglify']);

};
