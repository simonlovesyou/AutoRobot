import { ScriptView } from '../components/';
import { connect } from 'react-redux';
import { scripts } from '../actions/'

const mapStateToProps = (state) => {

  let error = state.activeScript.error;
  return {
    src: state.activeScript.src || 'No active script src',
    content: state.activeScript.content || 'No active script code',
    status: state.activeScript.status || 'No active script',
    name: state.activeScript.name || 'No name',
    code: state.activeScript.code || '',
    logs: state.activeScript.logs || [],
    error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRunClick: (src) => {
      dispatch(scripts.runScript(src))
    },
    onRefreshClick: (src) => {
      dispatch(scripts.refreshScript(src))
    },
    onScriptLog: (src) => scripts.log(dispatch, src),
    onRemoveScript: (src) => {
      dispatch(scripts.removeScript(src));
    }
  }
}

const VisibleScriptView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptView);

export default VisibleScriptView;