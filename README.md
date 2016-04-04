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
Hotkeys are defined with the function ``Hotkey`` that accepts a string and a callback. In the provided example below we will launch Spotify when the Alt key and 8 is pressed simultaneously. 

```javascript
Hotkey('Alt 8', () => {
	let spotify = {
		name: 'Spotify',
		path: '/Applications/Spotify.app',
		isHidden: true //Hidden on launch, only works on Mac atm
	}
	program.launch(spotify);
});
```

### Hotstrings
Hotstrings are defined with the function ``Hotstring`` which accepts two strings for its parameters. In the provided example below we will type out the current date when the user writes 'ddate' 

```javascript
Hotstring('@@', new Date().toString());
```

The ``ddate`` will be erased by default, which can be overridden. Please see the full API for additional information.


## Documentation

### Scripts
Each script is a plain .txt or .js file with Javascript. A plain Javascript file will run upon execution, but some blocks may be defined to run only when some event occurs, such as a keystroke or hotkeypress. 

Before executing the scripts they're evaluated with [UglifyJS](https://github.com/mishoo/UglifyJS). If the scripts pass the evaluation they will be parsed to ES5 Javascript (Which means you can write Javascript/Node.js with ES6+) and they're executed with the use of [safe-eval](https://www.npmjs.com/package/safe-eval). Any syntax error found before execution must be fixed before the script can run. 

### API (WIP, may change)
#### Hotstring

#### Hotkey

#### Mouse 
 - setMouseDelay
 - moveMouse
 - moveMouseSmooth
 - mouseClick
 - mouseToggle
 - getMousePos
 - scrollMouse

#### Program
 - launch
 - exit

#### Screen
 - getPixelColor
 - getScreenSize










