import {shortcut} from '../util/';

function register (s, cb) {
  shortcut.registerShortcut(s, cb);
}

function once (s, cb) {
  shortcut.registerShortcut(s, () => {
    shortcut.unregister(s);
    cb();
  })
}

module.exports = {
  register,
  unregister: shortcut.unregister,
  once
}