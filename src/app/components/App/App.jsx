import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ScriptListContainer, AddScript, ScriptViewContainer } from '../../containers'

let App = () => (
  <div>
    <ScriptListContainer />
    <AddScript />
    <ScriptViewContainer />
  </div>
)

export default App;
