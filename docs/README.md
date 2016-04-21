# Documentation
## Scripts
Each script is a plain .txt or .js file with Javascript. A plain Javascript file will run upon execution, but some blocks may be defined to run only when some event occurs, such as a hotkey press. 

Before executing the scripts they're evaluated and parsed with [Babel](https://github.com/babel/babel) with the [ES2015 preset](https://babeljs.io/docs/plugins/preset-es2015/), which means that you can write Javascript with the ES2015 spec. The scripts are executed with the use of [safe-eval](https://www.npmjs.com/package/safe-eval). Any syntax error found before execution must be fixed before the script can run. 

### Examples
 - [Snippets/Examples](snippets.md)
 ### API
 - [Clipboard](clipboard.md)
 - [Hotkey](hotkey.md)
 - [Launch](launch.md)
 - [RobotJS (external)](https://github.com/octalmage/robotjs/)
 - [applescript (external)](https://www.npmjs.com/package/applescript)