import fs from 'fs';
import path from 'path';
import {promisify} from 'bluebird';

const readFile = promisify(fs.readFile);


const runScript = (scriptSrc) => ({
  type: 'RUN_SCRIPT',
  src: scriptSrc
});


const loadScriptPending = (scriptSrc, name, status) => ({
  type: 'LOAD_SCRIPT_PENDING',
  src: scriptSrc,
  name,
  status
});


const refreshScriptPending = (scriptSrc, status) => ({
  type: 'REFRESH_SCRIPT_PENDING',
  src: scriptSrc,
  status
});


const loadScriptSuccess = (scriptSrc, content, name, validated) => ({
  type: 'LOAD_SCRIPT_SUCCESSFUL',
  src: scriptSrc,
  validated,
  name,
  content
});

const refreshScriptSuccess = (scriptSrc, name, content, validated) => ({
  type: 'REFRESH_SCRIPT_SUCCESSFUL',
  src: scriptSrc,
  name,
  content,
  validated
});


const loadScriptUnsuccess = (scriptSrc, name, error) => ({
  type: 'LOAD_SCRIPT_UNSUCCESSFUL',
  src: scriptSrc,
  name,
  error
});

const refreshScriptUnsuccess = (scriptSrc, name, error) => ({
  type: 'REFRESH_SCRIPT_UNSUCCESSFUL',
  src: scriptSrc,
  error,
  name
});
const loadScript = (scriptSrc, name) => 
  (dispatch) => {
    dispatch(loadScriptPending(scriptSrc, name, 'Pending'));

    return readFile(scriptSrc, 'utf8')

    .then(content => dispatch(loadScriptSuccess(scriptSrc, content, name, false)))

    .catch(err => dispatch(loadScriptUnsuccess(scriptSrc, name, err)));
}

const addLog = (scriptSrc, log) => ({
  type: 'ADD_SCRIPT_LOG',
  src: scriptSrc,
  log
});

const log = (dispatch, scriptSrc) => 
  (message) => {
    let line = (new Error).stack.split("\n")[4];
    return dispatch(addLog(scriptSrc, message, line));
  }

const toggleScript = (scriptSrc) => ({
  type: 'TOGGLE_SCRIPT',
  src: scriptSrc
});

const removeScript = (scriptSrc) => ({
  type: 'REMOVE_SCRIPT',
  src: scriptSrc
});

const refreshScript = (scriptSrc, name) => 
  (dispatch) => {

    dispatch(refreshScriptPending(scriptSrc, 'Pending'));

    return readFile(scriptSrc, 'utf8')

    .then(content => dispatch(refreshScriptSuccess(scriptSrc, name, content, 'OK')))

    .catch(err => dispatch(refreshScriptUnsuccess(scriptSrc, name, err)));
  }

module.exports = {
  runScript,
  refreshScript,
  loadScript,
  loadScriptSuccess,
  loadScriptUnsuccess,
  loadScriptPending,
  refreshScript,
  refreshScriptUnsuccess,
  refreshScriptSuccess,
  refreshScriptPending,
  toggleScript,
  addLog,
  log,
  removeScript
};