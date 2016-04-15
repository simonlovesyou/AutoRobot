import hotkey from './hotkey.js';
import hotstring from './hotstring.js';
import launch from './launch.js';
import applescript from 'applescript';
import {remote} from 'electron';


module.exports = {
  hotkey,
  hotstring,
  launch,
  applescript,
  clipboard: remote.clipboard
}