import path from 'path';
import {promisify} from 'bluebird';
import fs from 'fs';
import safeEval from 'safe-eval';
import objectPath from 'immutable-path';
import lib from '../../client/lib/'
import {setUserRequire} from '../../client/util/'
import {log} from '../../client/util/'
import update from 'react/lib/update';
import actions from '../../app/actions/'

const readFile = promisify(fs.readFile);

const babel = require('babel-core');
const babelOptions = {
  presets: ['es2015']
}


function runScript(script, src) {

  console.log(script);

  let userContext = {
    require: setUserRequire(lib, src),
    console,/*: {
      log: //log(actions.scripts.addLog, store, src, true)
    },*/
    setTimeout,
    setImmediate,
    __dirname: src,
    Math
  };

  try {
    console.log("RUN!");
    console.log(script.content);
    safeEval(script.code, userContext);
  } catch(e) {
    console.error(e);
  }
}


function parseCode(code) {
  let parsedCode;
  try {
    parsedCode = babel.transform(code, babelOptions).code;
  } catch(e) {
    return e;
  } 

  return parsedCode;
}

function scriptValidate(content, name) {
  let res = parseCode(content);

  let code = typeof res === 'string' ? res : null;
  let status = res instanceof Error ? {message: 'Syntax Error'} : {message: 'OK'};

  let newScript = {
    code: code || content,
    status: status.message,
    errors: [],
    logs: [],
    validated: true,
    active: false,
    name,
    content
  }

  if(res instanceof Error) {
    newScript.error = res;
  }

  return newScript;
}

function scriptReducer(state = {}, action) {
  if(!state.scripts) {
    state.scripts = {};
  }
  if(!state.activeScript) {
    state.activeScript = {};
  }
  switch(action.type) {
    case 'LOAD_SCRIPT_PENDING':
      return update(state, {
        scripts: {
          [action.src]: {
            $set: {
              status: action.status,
              name: action.name
            }
          }
        }
      })
      
    case 'LOAD_SCRIPT_SUCCESSFUL':
      return update(state, {
        scripts: {
          [action.src]: {
            $set: {
              ...scriptValidate(action.content, action.name)
            }
          }
        }
      });
    case 'LOAD_SCRIPT_UNSUCCESSFUL':
      return update(state, {
        scripts: {
          [action.src]: {
            $merge: {
              status: action.error.message,
              name: action.name,
              error: action.error
            }
          }
        }
      })
    case 'REFRESH_SCRIPT_PENDING':
      return update(state, {
        scripts: {
          [action.src]: {
            $merge: {
              status: action.status
            }
          }
        },
        activeScript: {
          $merge: {
            status: action.status
          }
        }
      })
    case 'REFRESH_SCRIPT_SUCCESSFUL':
      let validated = scriptValidate(action.content, action.name)
      return update(state, {
        scripts: {
          [action.src]: {
            $merge: validated
          }
        },
        activeScript: {
          $merge: validated
        }
      });
    case 'REFRESH_SCRIPT_UNSUCCESSFUL':
      return update(state, {
        scripts: {
          [action.src]: {
            $merge: {
              status: action.error.message,
              name: action.name
            }
          },
          activeScript: {
            $merge: {
              status: action.error.message
            }
          }
        }
      });
    case 'ADD_SCRIPT_LOG':
      return update(state, {
        scripts: {
          [action.src]: {
            logs: {
              $push: [action.log]
            }
          }
        }
      })
    case 'TOGGLE_SCRIPT':
      return update(state, {
        $merge: {
          activeScript: Object.assign({}, state.scripts[action.src], {src: action.src})
        }
      })
    default:
      return state;
  }
}

module.exports = scriptReducer;
