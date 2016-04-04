module.exports = function (grunt) {

    // Project configuration. 
    grunt.initConfig({
        concat: {
          options: {
            separator: ';',
          },
          dist: {
            src: ['src/ajax.js', 'src/form_validation.js', 'src/form_wizard.js'],
            dest: 'dest/single.js',
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

    
    // A very basic default task.
//    grunt.registerTask('default', 'Log some stuff.', function() {
//      grunt.log.write('Logging some stuff...').ok();
//    });

};