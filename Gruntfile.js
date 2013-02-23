module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
      build: {
        src: 'gistdeck.js',
        dest: 'gistdeck.min.js'
      }
    },
    cssmin: {
      build: {
        src: 'gistdeck.css',
        dest: 'gistdeck.min.css'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-css');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin']);

};
