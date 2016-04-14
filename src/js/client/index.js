import safeEval from 'safe-eval';
import dir from 'node-dir';
import path from 'path';
import {ipcRenderer} from 'electron';
console.log(__dirname);
console.log(process.cwd());
import {scripts} from './../../client/util/';
const babel = require('babel-core');
const babelOptions = {
  presets: ['es2015']
}

let script = process.env.script;

scripts.addScript(script, (script) => {

  if(script.status === 'OK') {
    ipcRenderer.send('code', {code: script.code, dir: script});
  } else {
    console.log(script.status);
    //Handle not OK scripts.
  }
});

