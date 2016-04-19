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

const refreshScriptSucces = (scriptSrc, content, name, validated) => ({
  type: 'REFRESH_SCRIPT_SUCCESSFUL',
  src: scriptSrc,
  validated,
  name,
  content
});


const loadScriptUnsuccess = (scriptSrc, name, error) => ({
  type: 'LOAD_SCRIPT_UNSUCCESSFUL',
  src: scriptSrc,
  error,
  name
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


const toggleScript = (scriptSrc) => ({
  type: 'TOGGLE_SCRIPT',
  src: scriptSrc
});

const refreshScript = (scriptSrc) => 
  (dispatch) => {

    dispatch(refreshScriptPending(scriptSrc, 'Pending'));

    return readFile(scriptSrc, 'utf8')

    .then(content => dispatch(refreshScriptSuccess(scriptSrc, content, name, false)))

    .catch(err => dispatch(refreshScriptUnsuccess(scriptSrc, name, err)));
  }

module.exports = {
  runScript,
  refreshScript,
  loadScript,
  loadScriptSuccess,
  loadScriptUnsuccess,
  loadScriptPending,
  toggleScript,
  addLog
};