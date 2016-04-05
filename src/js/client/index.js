import safeEval from 'safe-eval';
import dir from 'node-dir';
import path from 'path';
import lib from './../js/lib/';

let scriptDirectory = process.env.script;

let options = {
  match: /.js$/,
  exclude: /^\./
}

if(path.isAbsolute(scriptDirectory)) {
  dir.readFiles(scriptDirectory, options, parseFile, success);
} else {
  throw new Error('Path for user script is not absolute.');
}

function parseFile(err, content, next) {
  if(err)
    throw err;
  safeEval(content);
  next();
}

function success(err, files) {
  if(err)
    throw err;
  console.log("Finished reading all files!");
}