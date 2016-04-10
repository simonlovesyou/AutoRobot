import {globalShortcut} from 'electron';

function registerShortcut (shortcut, cb) {

  //TODO: Should validate so that shortcut is a valid shortcut

  let ref = globalShortcut.register(shortcut, cb);

  if(!ref) {
    throw new Error('Shortcut registration failed');
  }
}

module.exports = {
  registerShortcut,
  unregisterAll: globalShortcut.unregisterAll,
  isRegistered: globalShortcut.isRegistered
  //TODO: Add a function for unregistering a specific shortcut
}