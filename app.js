var grunt = require('grunt');

if(process.argv[2] == 'concat') {
    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');    
    grunt.registerTask('concat', ['concat']);
    grunt.tasks(['concat']);
}
else if(process.argv[2] == 'minify') {
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('minify', ['uglify']);
    grunt.tasks(['minify']);
}