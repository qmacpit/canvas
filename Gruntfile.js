module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
				livereload: true,
		    },	    
			scripts: {
				files: ['stylesheets/less/**/*.less', '*.html', 'js/**/*.js'],
				tasks: ['less']
			}
		},
		less: {
		    options: {
		        paths: 'stylesheets/'
		    },
		    src: {
		        expand: true,
		        cwd: 'stylesheets/',
		        src: [
		            'less/**/*.less'
		        ],
		        ext: '.css',
		        dest: 'stylesheets/css/',
		        rename: function(dest, src) {
		        	console.log(src);
		        	console.log(dest);	
		        	var array = src.split("/"), filename = array[array.length - 1];

		          return dest + filename.split(".")[0] + ".css";
		        }
		    }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');	
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', 'watch');
};