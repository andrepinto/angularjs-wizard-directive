module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    var PathConfig = {
        sample: 'sample',
        bower: 'bower_components',
        widgets: 'sample/scripts/widgets'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: PathConfig,
        uglify: {
            options: {
                compress: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> \n <%= pkg.author %> */\n'
            },
            target: {
                src: 'dist/wizard.ngmin.js',
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
            dist: {
                target: ['dist']
            },
            sample_libs: {
                target: ['<%= config.bower %>/vendor']
            }

        },
        copy: {
            libs: {
                files: [
                    {
                        cwd: '<%= config.bower %>/angular/',
                        src: ['angular.min.js','angular.min.js.map','angular.js'
                        ],
                        dest: '<%= config.sample %>/vendor/',
                        expand: true
                    },
                    {
                        cwd: '<%= config.bower %>/angular-route/',
                        src: ['angular-route.min.js','angular-route.min.js.map','angular-route.js'
                        ],
                        dest: '<%= config.sample %>/vendor/',
                        expand: true
                    }
                ]
            },
            build:{
                    files: [
                    {
                        cwd: 'src/template/',
                        src: ['wizard.tmp.html'],
                        dest: 'dist/view/',
                        expand: true
                    },
                    {
                        cwd: 'src/css/',
                        src: ['wizard.css'],
                        dest: 'dist/view/',
                        expand: true
                    }    
                    ]
                },                
            
            sample:{
                    files: [
                    {
                        cwd: 'dist/view',
                        src: ['wizard.tmp.html'],
                        dest: '<%= config.sample %>/views/',
                        expand: true
                    },
                    {
                        cwd: 'dist/',
                        src: ['wizard.ngmin.js'],
                        dest: '<%= config.widgets %>/wizard/',
                        expand: true
                    },
                    {
                        cwd: 'dist/view',
                        src: ['wizard.css'],
                        dest: '<%= config.sample %>/styles',
                        expand: true
                    }
                    ]
            },


            css_bootstrap: {
                files: [{
                        cwd: '<%= config.bower %>/bootstrap/dist/css/',
                        src: [
                          'bootstrap.min.css'
                        ],
                        dest: '<%= config.sample %>/styles',
                        expand: true
                      },
                      { 
                        cwd: '<%= config.bower %>/bootstrap/dist/fonts/',
                        src: [
                          'glyphicons-halflings-regular.eot', 'glyphicons-halflings-regular.svg',
                          'glyphicons-halflings-regular.ttf', 'glyphicons-halflings-regular.woff'
                        ],
                        dest: '<%= config.sample %>/styles/fonts/',
                        expand: true
                      }
                ]
            }
        }
    });
  

    grunt.registerTask('sample', ['clean:sample_libs', 'copy:libs','copy:css_bootstrap', 'copy:sample' ]);
    grunt.registerTask('build', ['clean:dist', 'ngmin', 'uglify', 'copy:build']);
}