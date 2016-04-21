# AutoRobot

AutoRobot is an open-source macro-creation and automation application for Mac/Windows, inspired by [AutoHotkey](https://autohotkey.com) and powered by Node.js/Javascript and [Electron shell](http://electron.atom.io). 

## What's possible with AutoRobot?
 - Automate basically everything by sending keystrokes and mouse clicks.
 - Remap keys and buttons on your keyboard.
 - Create hotkeys for your keyboard.
 - Expand abbreviations inline, as you type them. 
 - Retrieve and change clipboard contents
 - Power your script with npm packages

## Example

### Get the current color at the mouse position as a hex value and save it to clipboard
```javascript
import hotkey from 'hotkey';
import clipboard from 'clipboard';
import robot from 'robotjs';

hotkey('Cmd+Alt+R', (error) => {
	if(error) {
		console.log(error);
		return;
	}
	let mouse = robot.getMousePos();
	let hex = robot.getPixelColor(mouse.x, mouse.y);

	clipboard.writeText("#" + hex);
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