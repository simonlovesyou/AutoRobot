/*import app from 'app';
import BrowserWindow from 'browser-window';
import ipc from 'ipc';
import path from 'path';
import Promise from 'bluebird';
let fs = Promise.promisifyAll(require('fs'));*/

import app from 'app';
import Tray from 'tray';
import Menu from 'menu';
import path from 'path';
import BrowserWindow from 'browser-window';
import clipboard from 'clipboard';

const iconPath = path.join(__dirname, 'icon.png');

const background = (() => {
  app.on('ready', () => {

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

    /*let contextMenu = Menu.buildFromTemplate(db('copies').toArray()
      .filter(copy => copy.favourite)
      .map(copy => ({
        label: copy.copyName,
        type: 'normal',
        toolTip: copy.copyText,
        click: (() => clipboard.writeText(copy.copyText))
      }))
    .concat(footer));*/

    appIcon.setToolTip('AutoRobot');
    //appIcon.setContextMenu(contextMenu);

  });

})



module.exports = background;