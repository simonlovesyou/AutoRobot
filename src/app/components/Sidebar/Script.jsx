import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Script extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props);
  };

  render () {
    return (
      <li className="script flex" onClick={() => this.props.onClick(this.props.src)}> 
        <div className="flex script-name"> 
          <p> {this.props.name} </p>
        </div>
        <div className="flex script-status">
          <p> <em> {this.props.status} </em> </p> 
        </div>
      </li>
    );
  }

}