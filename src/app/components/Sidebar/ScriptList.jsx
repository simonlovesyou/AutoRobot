import React, { Component, PropTypes } from 'react';
import Script from './Script';
import ReactDOM from 'react-dom';

export default class ScriptList extends Component {

  static propTypes = {
    onScriptClick: PropTypes.func.isRequired,
    scripts: PropTypes.objectOf(React.PropTypes.object.isRequired).isRequired,
  }

  constructor (props) {
    super(props);
  };

  render () {

    let renderScripts = [];

    for(var script in this.props.scripts) {
      renderScripts.push({...this.props.scripts[script], src: script});
    }

    let scripts = renderScripts.map((script) => {
      return (<Script src={script.src || ''}
                      name={script.name || ''}
                      key={script.src || ''}
                      onClick={this.props.onScriptClick || ''}
                      status={script.status || ''}/>);
    });

    if(!this.props.show) {
      return null;
    }
    return (
      <div id="scriptList" className="container flex" key={0}>
        <div className="flex">
          <h4 className="flex"> Scripts </h4>
          <button className="flex" onClick={() => {this.props.onAddScriptClick()}}> + </button>
        </div>
        <ul>
          {scripts}
        </ul>
      </div>
    );
  }
}