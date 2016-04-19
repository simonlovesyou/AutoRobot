import React from 'react';
import { ScriptList } from '../components/';
import { connect } from 'react-redux';
import { scripts } from '../actions/'

let AddScript = ({dispatch}) => {
  let src,
      name;
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!name.value.trim() || !src.value.trim()) {
          return
        }
        dispatch(scripts.loadScript(src.value, name.value))
        name.value = '';
        src.value = '';
      }}>
        <input ref={node => {
          name = node
        }} />
        <input ref={node => {
          src = node
        }} />
        <button type="submit">
          Add Script
        </button>
      </form>
    </div>
  )
}

AddScript = connect()(AddScript)

export default AddScript