import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Highlight from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';
import safeEval from 'safe-eval';
import lib from '../../../client/lib';
import {setUserRequire} from '../../../client/util';

export default class Script extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onRunClick: PropTypes.func.isRequired,
    onScriptLog: PropTypes.func.isRequired,
    logs: PropTypes.array.isRequired,
    error: PropTypes.object
  }

  constructor (props) {
    super(props);
    this.runScript = this.runScript.bind(this);
  };

  runScript(log) {
    let userContext = {
      require: setUserRequire(lib, this.props.src),
      console: {
        log: log(this.props.src)
      },
      setTimeout,
      setImmediate,
      __dirname: this.props.src,
      Math
    };

    /*window.onerror = function myErrorHandler(error) {
      log(this.props.src)(e);
    }*/

    try {
      safeEval(this.props.code, userContext);
    } catch(e) {
      log(this.props.src)(e);
    }
  }

  render () {

    let syntaxError;

    if(this.props.status === 'Syntax Error') {
      syntaxError = (
        <div className="error syntax">
          {this.props.error.message}
        </div>
        );
    }

    let logs = [];

    if(this.props.logs.length > 0) {
      this.props.logs.forEach((log, i) => {
        logs.push(<p className={log instanceof Error ? 'error' : 'log'} key={i}> {log.message ? 'Error: ' + log.message : log} </p>); 
      });
    }

    return (
      <div className="scriptView">
        <h1> {this.props.name} </h1>
        <h2> {this.props.src} </h2>
        <h3 className={"alert" + this.props.status === 'OK' ? "alert-success" : "alert-warning"}> {this.props.status} </h3>
        {syntaxError}
        <Highlight language='javascript' style={docco}>
          {this.props.content}
        </Highlight>
        <button onClick={() => this.runScript(this.props.onScriptLog)} disabled={this.props.status !== 'OK'}> Run </button>
        <button onClick={() => this.props.onRefreshClick(this.props.src, this.props.name)}> Refresh </button>
        <button onClick={() => this.props.onRemoveScript(this.props.src)}> Remove </button>
        <div id="logs">
          {logs}
        </div>

      </div>
    );
  }

}
//<button onClick={() => this.props.onRunClick(this.props.src)} disabled={this.props.status !== 'OK'}> Run </button>