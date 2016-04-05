

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

	grunt.initConfig({

	  babel: {
      options: {
        presets: ['es2015']
      },
	    main: {
        options: {
          sourceMap: false
        },
	      files: {
          'client/index.js': 'src/js/index.js',
          'client/background/index.js': 'src/js/background/index.js'
        }
	    },
      client: {
        options: {
          sourceMap: true
        },
        files: [{
          "expand": true,
          "cwd": "src/",
          "src": ["index.js"],
          "dest": "./client/",
          "ext": ".js"
        }]
      }
	  },
    eslint: {
      target: ["./src/**/*.js"]
    },
    clean: {
      tmp: ["client/**/*", "!client/package.json", "!client/node_modules/**", "!client/icon.png"]
    },
    jade: {
      release: {
        options: {
          data: {
            debug: false
          },
          pretty: true
        },
        files: {
          "client/static/html/index.html": ["src/jade/content.jade"]
        },
        compile: {
          expand: true
        }
      }
    },
	  watch: {
      options: {
        spawn: false
      },
	  	client: {
	  		files: ["src/index.js"],
	  		tasks: ["babel:client"]
	  	},
      main: {
        files: ["src/js/*.js", "src/js/background/*.js"],
        tasks: ["babel:background"]
      }
	  }
	});

	grunt.registerTask("default", ["clean", "babel", "jade", "watch"]);

};