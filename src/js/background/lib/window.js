//Button (All html attributes)
//Onclick 
import {BrowserWindow} from 'electron';
import {ipcMain} from 'electron';
import shortid from 'shortid';

let browserWindow;

let windows = [];
let events = {};

function createWindow(windowOptions, cb) {
  if(!windowOptions instanceof Object) {
    return cb(new Error('Window object must an instanceof Object, got' + typeof window));
  }

  let window = addNewWindow(windowOptions);

  windows[0].children.push(window);

  if(windowOptions.devTools) {
    window.openDevTools();
  }

  window.webContents.on('did-finish-load', () => {
    window.webContents.send('window.create', {windowID: window.id, DOM: windowOptions.DOM});
  });
}


function addNewWindow(windowOptions) {
  console.log(windowOptions);
  let window = new BrowserWindow(windowOptions);
  console.log(window);
  window.loadURL('file://' + process.cwd() + '/client/static/html/userland.html');
  windowOptions.DOM["data-id"] = shortid.generate();
  window.DOM = windowOptions.DOM;

  windowOptions.DOM.children = windowOptions.DOM.children.map((child) => {return processChildElements(child, window)});

  return window;
}

function setBrowserWindow(bw) {
  windows.push({window: bw, role: 'main', 'allow-exit': false, children: []});

  return createWindow;
}

function processChildElements(node, window) {
  if(node.children) {
    node.children.forEach(setId);
  }

  node["data-id"] = shortid.generate();
  node['userland-events'] = [];

  for(var attr in node) {
    if(node.hasOwnProperty(attr)) {
      if(typeof node[attr] === 'function') {
        node['userland-events'].push(attr);
        window[node["data-id"] + attr] = node[attr];
      }
    }
  }
  return node;
}

ipcMain.on('userland.event', (event, args) => {

  console.log(args);
  console.log("windows");
  console.log(windows[0]);


  windows[0].children.forEach(w => console.log(w.id));
  let win = windows[0].children.find(w => w.id === args.windowID);


  win[args.eventID](args.element);

})



module.exports = {
  setBrowserWindow
};
