import { ScriptView } from '../components/';
import { connect } from 'react-redux';
import { scripts } from '../actions/'

const mapStateToProps = (state) => {

  let error = state.activeScript.error;
  console.log("dispatching props");
  console.log(state);
  return {
    src: state.activeScript.src || 'No active script src',
    content: state.activeScript.content || 'No active script code',
    status: state.activeScript.status || 'No active script',
    name: state.activeScript.name || 'No name',
    error
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log(scripts);
  return {
    onRunClick: (src) => {
      dispatch(scripts.runScript(src))
    },
    onRefreshClick: (src) => {
      dispatch(scripts.refreshScript(src))
    }
  }
}

const VisibleScriptView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptView);

export default VisibleScriptView;