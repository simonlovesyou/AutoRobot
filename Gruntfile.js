'use strict';
const dev = process.env.NODE_ENV ? !!process.env.NODE_ENV.match(/dev/) : true;

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

	grunt.initConfig({

	  babel: {
      options: {
        presets: ['es2015']
      },
	    main: {
        options: {
          sourceMap: dev
        },
	      files: {
          'client/index.js': 'src/js/index.js',
          'client/background/index.js': 'src/js/background/index.js'
        }
	    },
      client: {
        options: {
          sourceMap: dev
        },
        files: [{
          "expand": true,
          "cwd": "src/js/client/",
          "src": ["*.js"],
          "dest": "./client/static/js/",
          "ext": ".js"
        }]
      },
      lib: {
        options: {
          sourceMap: dev
        },
        files: [{
          "expand": true,
          "cwd": "src/js/client/lib/",
          "src": ["**/*.js"],
          "dest": "./client/static/js/lib/",
          "ext": ".js"
        }]
      },
      "main-util": {
        options: {
          sourceMap: dev
        },
        files: [{
          "expand": true,
          "cwd": "src/js/background/util/",
          "src": ["*.js"],
          "dest": "./client/background/util/",
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
            debug: dev
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
	  		files: ["src/js/client/**/*.js"],
	  		tasks: ["babel:client"]
	  	},
      "client-lib": {
        files: ["src/js/client/lib/*.js"],
        tasks: ["babel:lib"]
      },
      main: {
        files: ["src/js/*.js", "src/js/background/*.js"],
        tasks: ["babel:main"]
      },
      "main-util": {
        files: ["src/js/background/util/*.js"],
        tasks: ["babel:main-util"]
      }
	  }
	});

	grunt.registerTask("dev", ["clean", "babel", "jade", "watch"]);
  grunt.registerTask("build", ["clean", "babel", "jade"]);

};