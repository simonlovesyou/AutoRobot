import { ScriptList } from '../components/';
import { connect } from 'react-redux';
import { scripts } from '../actions/'

const mapStateToProps = (state) => {
  console.log("Received state:");
  console.log(state);
  return {
    scripts: state.scripts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onScriptClick: (src) => {
      dispatch(scripts.toggleScript(src))
    }
  }
}

const VisibleScriptList = connect (
  mapStateToProps,
  mapDispatchToProps
)( ScriptList );

export default VisibleScriptList;