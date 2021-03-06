import {exec} from 'child_process';
import {isAbsolute} from 'path';

function launch(path, options = {}) {
  if(!isAbsolute(path)) {
    throw new Error('Application path "%s" is not absolute.', path);
  }
  if(!options instanceof Object) {
    throw new Error('Option passed to launch must be an instance of Object, got ', typeof options);
  }

  if(!options.detached instanceof Boolean) {
    throw new Error('Option key \'detached\' must an instance of Boolean, got ', typeof options.detached);
  }

  options = {
    detached: options.detached || true
  }

  return exec(path, options, (err, stdout, stderr) => {
    if(err) {
      console.log(stderr);
    }
  });
}

module.exports = launch;