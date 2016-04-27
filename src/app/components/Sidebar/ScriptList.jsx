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
      <div id="scriptList" key={0}>
        <ul>
          {scripts}
        </ul>
      </div>
    );
  }
}