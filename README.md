# AutoRobot

AutoRobot is an open-source macro-creation and automation application for Mac/Windows, inspired by [AutoHotkey](https://autohotkey.com) and powered by Node.js/Javascript and [Electron shell](http://electron.atom.io). 

## What's possible with AutoRobot?
 - Automate basically everything by sending keystrokes and mouse clicks.
 - Remap keys and buttons on your keyboard.
 - Create hotkeys for your keyboard.
 - Expand abbreviations inline, as you type them. 
 - Retrieve and change clipboard contents
 - Power your script with npm packages


## Basic usage

### Hotkeys
Hotkeys are defined with the function ``hotkey`` that accepts a string and a callback. In the provided example below we will launch Spotify when the keys Command, Alt and 1 are pressed simultaneously and respectively quit Spotify with Command, Alt and 2. 

```javascript
import hotkey from 'hotkey';
import launch from 'launch';
let spotify;

hotkey('Cmd+Alt+1', (err) => {
  if(err) {
    console.log(err);
  }
  spotify = launch('/Applications/Spotify.app/Contents/MacOS/Spotify', {detached: true});
});  

hotkey('Cmd+Alt+2', (err) => {
  if(err) {
    console.log(err);
  }
  spotify.kill();
});
```

### Hotstrings
Hotstrings are defined with the function ``Hotstring`` which accepts two strings for its parameters. In the provided example below we will type out the current date when the user writes 'ddate' 

```javascript
import hotstring from 'hotstring';
hotstring('@@', new Date().toString());
```

The ``ddate`` will be erased by default, which can be overridden. Please see the full API for additional information.

### Applescript
AutoRobot can execute arbitrary AppleScript. In the following example we will ask iTunes to get the name of the current selection.

```javascript
import applescript from 'applescript';
import hotkey from 'hotkey';

const script = 'tell application "iTunes" to get name of selection';

hotkey('Alt+MediaPlayPause', (err) => {

  applescript.execString(script, function(err, res) {
    if (err) {
      console.log(err);
    }
    res.forEach((songName) => {
    	console.log(songName);
    });
  });
});
```

## Documentation

Please see the [docs](docs/README.md)

## Build

To help contribute or test AutoRobot, follow these steps:

```
git clone https://github.com/simonlovesyou/AutoRobot.git
cd autorobot
npm install
npm run build # Alt. npm run dev
npm start
```