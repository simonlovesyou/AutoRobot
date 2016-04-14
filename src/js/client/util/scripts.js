import dir from 'node-dir';
import path from 'path';
import fs from 'fs';

const babel = require('babel-core');
const babelOptions = {
  presets: ['es2015']
}
const scripts = {};

let options = {
  match: /.js$/,
  exclude: /^\./,
  recursive: false
}

function addScript (scriptSrc, cb) {
  if (path.isAbsolute(scriptSrc)) {
    fs.readFile(scriptSrc, 'utf8', (err, content) => {

      let res = parseCode(content);
      console.log(typeof res);

      let code = typeof res === 'string' ? res : null;
      let status = err || res instanceof Error ? res : 'OK';

      let script = {
        code,
        status
      }

      scripts[scriptSrc] = script;

      console.log(script);

      return cb(script);
    });
  } else {
    throw new Error('Path for user script is not absolute.');
  }
}

function loadScript (scriptSrc) {
  return scripts[scriptSrc] || new Error('Cannot find parsed script.');
}

function parseCode(code) {
  let parsedCode;
  try {
    parsedCode = babel.transform(code, babelOptions).code;
  } catch(e) {
    if(e.name === 'TypeError') {
      // TODO: Handle syntax error and show it to the user
      return e;
    } 
    return e;
  } 

  console.log(typeof parsedCode);

  return parsedCode;
}

module.exports = {
  addScript,
  loadScript
}