import React, { Component } from 'react';
import { connect } from 'react-redux';


export default class AddScript extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    let name,
        src;

    if(!this.props.show) {
      return null;
    }

    return (
      <div id="addScript" className="flex">
        <div className="flex">
          <div className="flex close">
            <button className="btn btn-close" onClick={() => this.props.onToggle()}> Close </button>
          </div>

          <form className="add-form" onSubmit={e => {
            e.preventDefault()
            if (!name.value.trim() || !src.value.trim()) {
              return
            }
            this.props.onAddScript(src.value, name.value);
            this.props.onToggle();
            name.value = '';
            src.value = '';
          }}>
            <input placeholder="Script name" ref={node => {
              name = node
            }} />
            <input placeholder="Script location" ref={node => {
              src = node
            }} />
            <button type="submit">
              Add Script
            </button>
          </form>
        </div>
      </div>
      );

  }
}