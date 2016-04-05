var grunt = require('grunt');

if (process.argv[2] == 'concat') {

    grunt.initConfig({
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/ajax.js', 'src/form_validation.js', 'src/form_wizard.js'],
                dest: 'dest/single.js',
            },
        }
    });

    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('combine', ['concat']);
    grunt.tasks(['combine']);
}
else if ((process.argv[2] == 'minify') && (process.argv[3] != '') && (process.argv[4] != '')) {

    grunt.initConfig({
        uglify: {
            my_target: {
              files: [{
                  expand: true,
                  cwd: process.argv[3],
                  src: '**/*.js',
                  dest: process.argv[4]
              }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('minify', ['uglify']);
    grunt.tasks(['minify']);
}
else if (process.argv[2] == 'minify') {

    grunt.initConfig({
        uglify: {
            my_target: {
                files: {
                    'dest/output.min.js': ['src/ajax.js', 'src/form_validation.js', 'src/form_wizard.js']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('minify', ['uglify']);
    grunt.tasks(['minify']);
}
else if (process.argv[2] == 'cssmin') {

    grunt.initConfig({
        cssmin: {
            target: {
                files: [{
                        expand: true,
                        cwd: 'src/css',
                        src: ['*.css', '!*.min.css'],
                        dest: 'dest/css',
                        ext: '.min.css'
                    }]
            }
        }
    });

    // Load the plugin that provides the "cssmin" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.registerTask('cssminify', ['cssmin']);
    grunt.tasks(['cssmin']);
}
else if (process.argv[2] == 'htmlmin') {

    grunt.initConfig({
        htmlmin: {// Task 
            dist: {// Target 
                options: {// Target options 
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {// Dictionary of files 
                    'dist/about.html': 'src/html/about.html', // 'destination': 'source' 
                    'dist/account_setting.html': 'src/html/account_setting.html'
                }
            },
            dev: {
               // Another target 
                    files: {
                        'dist/cancel_FulhamFC.html': 'src/html/cancel_FulhamFC.html',
                        'dist/challenges.html': 'src/html/challenges.html'
                    }
               
            },
            test: {// Another target 
                files: {
                    'dist/cancel_FulhamFC.html': 'src/html/cancel_FulhamFC.html',
                    'dist/challenges.html': 'src/html/challenges.html'
                }
            }
        }
    });

    // Load the plugin that provides the "cssmin" task.
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    //grunt.registerTask('cssminify', ['cssmin']);
    grunt.tasks(['htmlmin:dev']);
}