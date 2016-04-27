import { ScriptView } from '../components/';
import { connect } from 'react-redux';
import { scripts } from '../actions/'

const mapStateToProps = (state) => {

  let activeScript = state.scripts.activeScript || {activeScript: {}}

  return {
    src: activeScript.src || 'No active script src',
    content: activeScript.content || 'No active script code',
    status: activeScript.status || 'No active script',
    name: activeScript.name || 'No name',
    code: activeScript.code || '',
    logs: activeScript.logs || [],
    error: activeScript.error || {},
    show: state.app.showAddDialog === undefined ? true : !state.app.showAddDialog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRunClick: (src) => {
      dispatch(scripts.runScript(src))
    },
    onRefreshClick: (src, name) => {
      dispatch(scripts.refreshScript(src, name))
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