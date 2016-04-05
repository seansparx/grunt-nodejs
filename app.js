var grunt = require('grunt');

if (process.argv[2] == 'concat') {
    concat();
}
else if ((process.argv[2] == 'minify') && (process.argv[3] != '') && (process.argv[4] != '')) {
    minifyJS(process.argv[3], process.argv[4]);
}
else if (process.argv[2] == 'cssmin') {
    minifyCSS(process.argv[3], process.argv[4]);
}
else if (process.argv[2] == 'htmlmin') {
    minifyHTML(process.argv[3], process.argv[4]);
}
else if (process.argv[2] == 'imagemin') {
    minifyIMG(process.argv[3], process.argv[4]);
}
else if (process.argv[2] == 'copy') {
    copyFiles(process.argv[3], process.argv[4]);
}


function concat()
{
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


function copyFiles(src, dest)
{
    grunt.initConfig({
        copy: {
            main: {
              files: [
                // includes files within path 
                {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

                // includes files within path and its sub-directories 
                {expand: true, src: ['path/**'], dest: 'dest/'},

                // makes all src relative to cwd 
                {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

                // flattens results to a single level 
                {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
              ],
            },
          }
    });

    // Load the plugin that provides the "cssmin" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.tasks(['copy']);
}



function minifyHTML(src, dest)
{
    grunt.initConfig({
        htmlmin: {
            target: {
                options: {                                 // Target options 
                  removeComments: true,
                  collapseWhitespace: true
                },
                files: [{
                        expand: true,
                        cwd: src,
                        src: ['**/*.html'],
                        dest: dest
                    }]
            }
        }
    });

    // Load the plugin that provides the "cssmin" task.
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.tasks(['htmlmin']);
}


function minifyCSS(src, dest)
{
    grunt.initConfig({
        cssmin: {
            target: {
                files: [{
                        expand: true,
                        cwd: src,
                        src: ['*.css', '!*.min.css'],
                        dest: dest,
                        ext: '.min.css'
                    }]
            }
        }
    });

    // Load the plugin that provides the "cssmin" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.tasks(['cssmin']);
}


function minifyIMG(src, dest)
{
    var mozjpeg = require('imagemin-mozjpeg');
    
    grunt.initConfig({
        imagemin: {                          // Task 
            my_target: {                          // Target 
              files: [{
                expand: true,                  // Enable dynamic expansion 
                cwd: src,                   // Src matches are relative to this path 
                src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
                dest: dest                  // Destination path prefix 
              }]
            }
        }
    });

    // Load the plugin that provides the "cssmin" task.
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.tasks(['imagemin']);
}


function minifyJS(src, dest)
{
    grunt.initConfig({
        uglify: {
            my_target: {
                files: [{
                        expand: true,
                        cwd: src,
                        src: '**/*.js',
                        dest: dest
                    }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.tasks(['uglify']);
}