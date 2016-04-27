import { ScriptView } from '../components/';
import { connect } from 'react-redux';
import { scripts } from '../actions/'

const mapStateToProps = (state) => {

  let activeScript = state.scripts.activeScript || {activeScript: {}}

  return {
    src: activeScript.src || '',
    content: activeScript.content || '',
    status: activeScript.status || '',
    name: activeScript.name || '',
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