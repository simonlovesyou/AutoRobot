# Snippets

Here are some examples of scripts you can use to power your computer:

## Toggle the contents the clipboard between lowercase and uppercase
```javascript
import hotkey from 'hotkey';
import clipboard from 'clipboard';

let uppercase = true;

//The hotkey could be any key combination that is not registered, please see the docs for hotkey for more information.
hotkey('Cmd+Alt+A', (error) => {
	if(error) {
		console.log(error);
		return;
	}
	let text = uppercase ? clipboard.readText().toUpperCase() : clipboard.readText().toLowerCase()
	clipboard.writeText(text);
	uppercase = !uppercase;
});
```

## Get the current color at the mouse as a hex value and save it to clipboard
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