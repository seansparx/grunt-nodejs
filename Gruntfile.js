module.exports = function (grunt) {

    // Project configuration. 
    grunt.initConfig({
        concat: {
          options: {
            separator: ';',
          },
          dist: {
            src: ['src/ajax.js', 'src/form_validation.js', 'src/form_wizard.js'],
            dest: 'dist/single.js',
          },
        },
        uglify: {
            my_target: {
              files: {
                'dest/output.min.js': ['src/ajax.js', 'src/form_validation.js', 'src/form_wizard.js']
              }
            }
          }
    });

    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['concat']);
    
    grunt.registerTask('minify', ['uglify']);
    
    // A very basic default task.
//    grunt.registerTask('default', 'Log some stuff.', function() {
//      grunt.log.write('Logging some stuff...').ok();
//    });

};