import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ScriptListContainer, AddScriptContainer, ScriptViewContainer } from '../../containers'

let App = () => (
  <div className="flex">
    <ScriptListContainer />
    <AddScriptContainer />
    <ScriptViewContainer />
  </div>
)

export default App;
