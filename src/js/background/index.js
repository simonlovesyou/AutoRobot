import app from 'app';
import Tray from 'tray';
import Menu from 'menu';
import path from 'path';
import BrowserWindow from 'browser-window';
import clipboard from 'clipboard';
const dev = process.env.NODE_ENV ? !!process.env.NODE_ENV.match(/dev/) : true;

const iconPath = path.join(process.cwd(), 'icon.png');

const background = (() => {
  app.on('ready', () => {

    let mainWindow = new BrowserWindow({width: 800, height: 600, show: true});
    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + process.cwd() + '/static/html/index.html');

    if(dev) {
      mainWindow.openDevTools();
    }

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        eApp.quit();
      }
    });
    console.log("Hej :)");

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

})



module.exports = background;