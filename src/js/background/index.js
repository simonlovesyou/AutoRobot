import {app} from 'electron';
import {Tray} from 'electron';
import {Menu} from 'electron';
import {BrowserWindow} from 'electron';
import {clipboard} from 'electron';
import {ipcMain} from 'electron';
import path from 'path';
import safeEval from 'safe-eval';
import lib from './lib/';
import {userWindow} from './lib/';
import {setUserRequire} from './util/';

const dev = process.env.NODE_ENV ? !!process.env.NODE_ENV.match(/dev/) : true;
const iconPath = path.join(process.cwd(), 'client/icon.png');


const background = (() => {
  app.on('ready', () => {

    let mainWindow = new BrowserWindow({width: 800, height: 600, show: true});
    // and load the index.html of the app.
    mainWindow.loadURL('file://' + process.cwd() + '/client/static/html/index.html');
    lib.userWindow.createWindow = userWindow.setBrowserWindow(mainWindow);

    if(dev) {
      mainWindow.openDevTools();
    }

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        eApp.quit();
      }
    });

    const appIcon = new Tray(iconPath);

    const footer = [
      {
        type: 'separator'
      },
      {
        label: 'Show all',
        accelerator: 'Alt+Command+A',
        click: () => {
          mainWindow.show();
          mainWindow.openDevTools();
        }
      },
      {
        label: "Edit",
        accelerator: 'Alt+Command+E',
        click: () => {
          mainWindow.show();
        }
      }]

  var contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ]);

    appIcon.setToolTip('AutoRobot');
    appIcon.setContextMenu(contextMenu);

  });
});


ipcMain.on('code', (event, arg) => {

  let userContext = {
    require: setUserRequire(lib, arg.dir),
    console,
    setTimeout,
    setImmediate,
    __dirname: arg.dir,
    Math
  };

  safeEval(arg.code, userContext);

})


module.exports = background;