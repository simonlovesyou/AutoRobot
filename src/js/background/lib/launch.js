import {exec} from 'child_process';
import {isAbsolute} from 'path';

function launch(path, options = {}) {
  if(!isAbsolute(path)) {
    return new Error('Application path "%s" is not absolute.', path);
  }
  if(!options instanceof Object) {
    return new Error('Option passed to launch must be an instance of Object, got ', typeof options);
  }

  if(!options.detached instanceof Boolean) {
    return new Error('Option key \'detached\' must an instance of Boolean, got ', typeof options.detached);
  }

  return exec(path, {detached: options.detached || true}, (err, stdout, stderr) => {
    if(err) {
      console.log(stderr);
    }
  });
}

module.exports = launch;