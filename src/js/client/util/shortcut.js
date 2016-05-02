const test = process.env.NODE_ENV ? !!process.env.NODE_ENV.match(/test/) : false;

var remote;

if(test) {
  remote = require('electron');
} else {
  remote = require('electron').remote;
}

const globalShortcut = remote.globalShortcut;
const modifiersRegex = [
                        /(?:^|\+)(Command)|(Cmd)/, 
                        /(?:^|\+)(Control)|(Ctrl)/, 
                        /(?:^|\+)(CommandOrControl|CmdOrCtrl)/, 
                        /(?:^|\+)(Alt)/, 
                        /(?:^|\+)(Shift)/, 
                        /(?:^|\+)(Super)/
                      ];
const keycodeRegex = [
                        /\+([0-9]$)/,
                        /\+([A-Z]$)$/,
                        /\+(F[1-24])$/,
                        /\+(\+)$/,
                        /\+(Space)$/,
                        /\+(Backspace)$/,
                        /\+(Delete)$/,
                        /\+(Insert)$/,
                        /\+(Return|Enter)$/,
                        /\+(Up|Down|Left|Right)$/,
                        /\+(Home)$/,
                        /\+(End)$/,
                        /\+(PageUp|PageDown)$/,
                        /\+(Escape|Esc)$/,
                        /\+(Volume(?:Up|Down|Mute))$/,
                        /\+(Media(?:NextTrack|PreviousTrack|Stop|PlayPause))$/
                      ];

function registerShortcut (shortcut, cb) {

  let result = isValid(shortcut);

  if(result instanceof Error) {
    return cb(result)
  }

  let valid = result;

  let ref = globalShortcut.register(shortcut, cb);

  if(!ref) {
    return cb(new Error('Shortcut registration failed'));
  }
  return;
}

function isValid(shortcut) {
  let modifier = modifiersRegex.some(regex => Boolean(shortcut.match(regex)));
  let keycode = keycodeRegex.some(regex => Boolean(shortcut.match(regex)));

  if(keycode && modifier) {
    let ref = globalShortcut.isRegistered(shortcut);
    if(ref) {
      return new Error('Shortcut is already registered');
    }
  } else {
    return new Error('Shortcut is not a valid key combination');
  }
  return true;
}

module.exports = {
  registerShortcut,
  unregisterAll: globalShortcut.unregisterAll,
  isRegistered: globalShortcut.isRegistered,
  unregister: globalShortcut.unregister,
  isValid
}