const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;

import {globalShortcut} from 'electron';

app.on('ready', function() {
  // Register a 'CommandOrControl+X' shortcut listener.
  var ret = globalShortcut.register('CommandOrControl+X', function() {
    console.log('CommandOrControl+X is pressed');
  });

  if (!ret) {
    console.log('registration failed');
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'));
});

app.on('will-quit', function() {
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+X');

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});


function registerShortcut (shortcut, cb) {

  //TODO: Should validate so that shortcut is a valid shortcut

  let shortcut = globalShortcut.register(shortcut, cb);

  if(!shortcut) {
    throw new Error('Shortcut registration failed');
  }
}

module.exports = {
  registerShortcut,
  unregisterAll: globalShortcut.unregisterAll
  //TODO: Add a function for unregistering a specific shortcut
}