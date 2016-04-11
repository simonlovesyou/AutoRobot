import {shortcut} from '../util/index.js';

function hotkey (s, cb) {
  shortcut.registerShortcut(s, cb);
}

module.exports = hotkey