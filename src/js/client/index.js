import safeEval from 'safe-eval';
import dir from 'node-dir';
import path from 'path';
import {ipcRenderer} from 'electron';
const babel = require('babel-core');
const babelOptions = {
  presets: ['es2015']
}

let scriptDirectory = process.env.script;

let options = {
  match: /.js$/,
  exclude: /^\./,
  recursive: false
}

if (path.isAbsolute(scriptDirectory)) {
  dir.readFiles(scriptDirectory, options, parseFile, success);
} else {
  throw new Error('Path for user script is not absolute.');
}

function parseFile (err, content, next) {
  if(err)
    throw err;

  let code;

  try {
    code = babel.transform(content, babelOptions).code;

  } catch(e) {
    if(e.name === 'TypeError') {
      // TODO: Handle syntax error and show it to the user
      console.log(e);
    } else {
      throw e;
    }
  } finally {
    ipcRenderer.send('code', {code, dir: scriptDirectory});
  }

  next();
}

function success (err, files) {
  if(err)
    throw err;
  console.log("Finished reading all files!");
}