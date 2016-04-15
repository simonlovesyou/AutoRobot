import {shortcut} from '../util/';

function hotkey (s, cb) {
  shortcut.registerShortcut(s, cb);
}

module.exports = hotkey