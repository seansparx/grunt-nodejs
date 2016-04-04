var grunt = require('grunt');

//grunt.registerTask('default', 'Log some stuff.', function() {
//    console.log('stuff');
//});

//grunt.tasks(['minify']);

// print process.argv
if(process.argv[2] == 'concat') {
    grunt.tasks(['default']);
}
else if(process.argv[2] == 'minify') {
    grunt.tasks(['minify']);
}