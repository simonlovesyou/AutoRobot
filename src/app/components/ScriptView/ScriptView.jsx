import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Highlight from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';
import safeEval from 'safe-eval';
//User-land lib
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
    error: PropTypes.object,
    show: PropTypes.bool.isRequired
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
      setTimeout: (cb, mm) => {setTimeout(cb, mm)},
      setImmediate: (cb) => {setImmediate(cb);},
      __dirname: this.props.src,
      Math
    };

    try {
      safeEval(this.props.code, userContext);
    } catch(e) {
      log(this.props.src)(e);
    }
  }

  renderNoScript() {
    return (
        <div className="scriptView flex container">
          <h2> Looks like you havent added any scripts yet! </h2>
          <h3> Click on the + button on the sidebar to the left to add one, and then select it from the list. </h3>
        </div>
      );
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

    if(this.props.show) {

      if(!this.props.name || !this.props.src) {
        return this.renderNoScript()
      }


      return (
        <div className="scriptView flex container">
          <h2> {this.props.name} </h2>
          <h3> {this.props.src} </h3>
          <h4 className={"alert" + this.props.status === 'OK' ? "alert-success" : "alert-warning"}> {this.props.status} </h4>
          {syntaxError}
          <div>
            <button onClick={() => this.runScript(this.props.onScriptLog)} disabled={this.props.status !== 'OK'}> Run </button>
            <button onClick={() => this.props.onRefreshClick(this.props.src, this.props.name)}> Refresh </button>
            <button onClick={() => this.props.onRemoveScript(this.props.src)}> Remove </button>
          </div>
          <div className="code">
            <Highlight language='javascript' style={github}>
              {this.props.content}
            </Highlight>
          </div>
          <h5> Logs: </h5>
          <div id="logs">
            {logs}
          </div>

        </div>
      );
    } else {
      return null;
    }
  }
}