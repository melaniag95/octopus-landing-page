module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //path variables
        source: '_src',
        dev: '_dev',
        scss: 'resources/scss',
        css: 'resources/css',
        js: 'resources/js',
        images: 'resources/images',
        fonts: 'resources/fonts',
        pdf: 'resources/pdf',
        favicons: 'resources/favicons',

        /*Grunt Watch*/
        watch: {
            content: {
                files: ['<%= source %>/**/*.html'],
                tasks: ['newer:processhtml:dev']
            },
            includes: {
                files: ['<%= source %>/_includes/**/*.html'],
                tasks: ['processhtml:dev']
            },
            images: {
                files: ['<%= source %>/<%= images %>/**/*.{png,jpg,gif,svg}','!<%= source %>/<%= images %>/<%= favicons %>/**/*'],
                tasks: ['newer:imagemin', 'copy:unoptimizedImage','copy:favicons']
            }, // watch images added to src
            scripts: {
                files: ['<%= source %>/<%= js %>/**/*.js'],
                tasks: ['copy:js'],
                options: {
                    spawn: false,
                }
            },
            fonts: {
                files: ['<%= source %>/<%= fonts %>/**/*'],
                tasks: ['copy:the_fonts'],
                options: {
                    spawn: false,
                }
            },
            the_pdf: {
                files: ['<%= source %>/<%= pdf %>/**/*.pdf'],
                tasks: ['copy:the_pdf'],
                options: {
                    spawn: false,
                }
            },
            scss: {
                files: ['<%= source %>/<%= scss %>/**/*.scss'],
                tasks: ['newer:sass:dist', 'postcss:dev'],
                options: {
                    spawn: false,
                }
            },

            partial_scss: {
                files: ['<%= source %>/<%= scss %>/**/_*.scss'],
                tasks: ['sass:partials', 'postcss:dev'],
                options: {
                    spawn: true,
                }
            },
            grunt: {
                files: ['gruntfile.js']
            }
        },

        /*Grunt Tasks*/

        // CLEAN: elimina la cartella _dev
        clean: ["<%= dev %>"],

        //IMAGEMIN: comprime le immagini
        imagemin: {
            dynamic: {
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: '<%= source %>/<%= images %>/', // source images (not compressed)
                    src: ['**/*.{png,jpg,gif,svg}'], // Actual patterns to match
                    dest: '<%= dev %>/<%= images %>/' // Destination of compressed files
                }]
            }
        },

        //SASS: compila gli scss
        sass: {
            dist: {
                options: {
                },
                files: {
                    '<%= dev %>/<%= css %>/octopus.css': '<%= source %>/<%= scss %>/octopus.scss'
                }
            },

            partials: {
                options: {
                },
                files: {
                    '<%= dev %>/<%= css %>/octopus.css': '<%= source %>/<%= scss %>/octopus.scss'
                }
            }
        },

        //POSTCSS: autoprefixer
        postcss: {
            dev: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer')({
                            browsers: 'last 2 version, IE 9'
                        }),

                    ]
                },
                src: '<%= dev %>/<%= css %>/octopus.css'
            }
        },

        //BROWSERSYNC
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['<%= dev %>/**', '<%= source %>/!.sass-cache']
                },
                options: {
                    server: {
                        baseDir: "<%= dev %>/"
                    },
                    ghostMode: false,
                    open: false,
                    watchTask: true
                }
            }
        },

        //PROCESS HTML: aggiunge gli html in _includes
        processhtml: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= source %>/',
                    src: ['**/*.html', '!_includes/**/*.html'],
                    dest: '<%= dev %>/',
                    ext: '.html'
                }]
            }
        },

        //COPY: copia cose da una cartella all'altra, ha dei sotto task per le varie cartelle
        copy: {
            the_fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= source %>/<%= fonts %>',
                    dest: '<%= dev %>/<%= fonts %>',
                    src: ['*.*']
                }]
            },
            js: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= source %>/<%= js %>',
                    dest: '<%= dev %>/<%= js %>',
                    src: ['**/*.js']
                }]
            },
            unoptimizedImage: {
                expand: true,
                cwd: '<%= source %>/<%= images %>/',
                src: ['**/*.{png,jpg,gif,svg}'],
                dest: '<%= dev %>/<%= images %>/',

                filter: function(filepath) {

                    var path = require('path');
                    var dest = path.join(
                        grunt.config('copy.main.dest'),
                        path.basename(filepath)
                    );
                    return !(grunt.file.exists(dest));
                },
            },
            favicons: {
                expand: true,
                dot: true,
                cwd: '<%= source %>/<%= images %>/<%= favicons %>',
                src: ['*.ico','*.json','*.xml','*.webmanifest'],
                dest: '<%= dev %>/<%= images %>/<%= favicons %>',
            },
            the_pdf: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= source %>/<%= pdf %>',
                    src: ['*.pdf'],
                    dest: '<%= dev %>/<%= pdf %>',
                }]
            },
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');


    // default for development: 'grunt'
    grunt.registerTask('default', ['browserSync', 'watch']);
    
    // rebuild the _dev folder: 'grunt build'
    grunt.registerTask('build', ['clean','processhtml:dev','imagemin','copy:unoptimizedImage','copy:js','sass:dist','postcss:dev','copy:the_pdf','copy:the_fonts','copy:favicons']);

};
