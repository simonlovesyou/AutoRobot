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
        <p> {this.props.name} </p> <p> <em> {this.props.status} </em> </p> 
      </li>
    );
  }

}