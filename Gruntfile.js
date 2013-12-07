module.exports = function(grunt){
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options:{
                compress : true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> \n <%= pkg.author %> */\n'
            },
            target: {
                src : 'dist/wizard.ngmin.js',
                dest: 'dist/wizard.min.js'
            }
        },
        ngmin: {
             directives: {
                expand: true,
                cwd: 'src',
                src: ['wizard.js'],
                dest: 'dist',
                ext: '.ngmin.js',
              }
        },
        clean: {
            target:['dist']
        }
    });
    
      grunt.registerTask('build', ['clean','ngmin', 'uglify']);
}