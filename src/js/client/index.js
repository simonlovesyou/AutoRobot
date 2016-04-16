import safeEval from 'safe-eval';
import dir from 'node-dir';
import path from 'path';
import {ipcRenderer} from 'electron';
import {scripts} from './../../client/util/';
import {setUserRequire} from './../../client/util/';
import lib from './../../client/lib/';

const dev = process.env.NODE_ENV ? !!process.env.NODE_ENV.match(/dev/) : true;

const babel = require('babel-core');
const babelOptions = {
  presets: ['es2015']
}

const dev = process.env.NODE_ENV ? !!process.env.NODE_ENV.match(/dev/) : true;

let scriptPath = process.env.script;

scripts.addScript(scriptPath, (script) => {

  if(script.status === 'OK') {

    let userContext = {
      require: setUserRequire(lib, script),
      console: {
        log: scripts.addLog(scriptPath, dev)
      },
      setTimeout,
      setImmediate,
      __dirname: scriptPath,
      Math
    };
    try {
      safeEval(script.code, userContext);
    } catch(e) {
      scripts.addError(scriptPath, e)
    }
  } else {
    //Show the script error to the user...
    console.log(script.status);
  }
});