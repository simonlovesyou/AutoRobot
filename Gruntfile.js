

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

	grunt.initConfig({

	  babel: {
      options: {
        presets: ['es2015']
      },
	    background: {
        options: {
          sourceMap: false
        },
	      files: {
          'client/background.js': 'src/background.js'
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
	  watch: {
      options: {
        spawn: false
      },
	  	client: {
	  		files: ["src/index.js"],
	  		tasks: ["babel:client"]
	  	},
      background: {
        files: ["src/background.js"],
        tasks: ["babel:background"]
      }
	  }
	});

	grunt.registerTask("default", ["clean", "babel", "watch"]);

};