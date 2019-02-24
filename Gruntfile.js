module.exports = function(grunt) {
  	grunt.initConfig({
  		pkg: grunt.file.readJSON('package.json'),
  		sass: {                              // Task
    		dist: {                            // Target
      			files: {                         // Dictionary of files
        			'dist/css/style.css': 'sass/main.scss'       // 'destination': 'source'
      			}
    		}
  		},  		
      	cssmin:{
       		minify: {
        		src: 'dist/css/style.css',
          		dest: 'dist/css/minified/stylemin.css'
        	}
      	},
      	browserSync:{
        	dev:{
          		bsFiles:{
            		src:[
              			'dist/css/minified/stylemin.css',
              			'*.html'
            		]              
          		},
          		options:{
            		watchTask: true,
            		server: './'
          		}          
        	}
      	},
      imagemin:{
        /*static: {
            options: {
                optimizationLevel: 3,
                //svgoPlugins: [{removeViewBox: false}],
               // use: [mozjpeg()] // Example plugin usage
            }
            //files: {
                //'dist/img.png': 'src/img.png',
                //'dist/img.jpg': 'src/img.jpg',
                //'dist/img.gif': 'src/img.gif'
            //}
        },*/
        dynamic: {
            files: [{
                expand: true,
                cwd: 'img/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'dist/resized_images'
            }]
        }
      },

	  	watch: {
		  	css: {
		  		files: ['sass/main.scss','sass/Partials/*.scss', 'sass/Modules/*.scss'],
		      	tasks: ['sass', 'cssmin']
		  	}		      
    	}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.registerTask('default',['imagemin','browserSync','watch']);
}