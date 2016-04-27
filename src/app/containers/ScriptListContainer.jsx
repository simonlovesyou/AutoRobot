import { ScriptList } from '../components/';
import { connect } from 'react-redux';
import { scripts, app } from '../actions/'

const mapStateToProps = (state) => {
  return {
    scripts: state.scripts.scripts,
    show: !state.app.showAddDialog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onScriptClick: (src) => {
      dispatch(scripts.toggleScript(src))
    },
    onAddScriptClick: () => {
      dispatch(app.toggleAddDialog());
    }
  }
}

const VisibleScriptList = connect (
  mapStateToProps,
  mapDispatchToProps
)( ScriptList );

export default VisibleScriptList;