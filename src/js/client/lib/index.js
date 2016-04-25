import hotkey from './hotkey.js';
import hotstring from './hotstring.js';
import launch from './launch.js';
import applescript from 'applescript';
import remote from 'electron';
import robotjs from 'robotjs';


module.exports = {
  hotkey,
  hotstring,
  launch,
  applescript,
  robotjs,
  clipboard: remote.clipboard
}