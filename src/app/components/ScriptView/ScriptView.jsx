import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Highlight from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';

export default class Script extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onRunClick: PropTypes.func.isRequired,
    error: PropTypes.object
  }

  constructor (props) {
    super(props);
  };

  render () {

    let syntaxError;

    if(this.props.status === 'Syntax Error') {
      syntaxError = (
        <div className="error syntax">
          {this.props.error.message}
        </div>
        );
    }

    return (
      <div className="scriptView">
        <h1> {this.props.name} </h1>
        <h2> {this.props.src} </h2>
        <h3> {this.props.status} </h3>
        {syntaxError}
        <Highlight language='javascript' style={docco}>
          {this.props.content}
        </Highlight>
        <button onClick={() => this.props.onRunClick(this.props.src)} disabled={this.props.status !== 'OK'}> Run </button>
        <button onClick={() => this.props.onRefreshClick(this.props.src)}> Refresh </button>
      </div>
    );
  }

}