import { AddScriptDialog } from '../components/';
import { connect } from 'react-redux';
import { scripts, app } from '../actions/';


const mapStateToProps = (state) => {
  console.log(1);
  console.log(state);
  return {
    show: state.app.showAddDialog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddScript: (src, name) => {
      dispatch(scripts.loadScript(src, name))
    },
    onToggle: () => {
      dispatch(app.toggleAddDialog())
    }
  }
}

const AddScriptContainer = connect (
  mapStateToProps,
  mapDispatchToProps
)( AddScriptDialog );

export default AddScriptContainer;