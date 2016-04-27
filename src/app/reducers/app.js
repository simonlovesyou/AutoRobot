import update from 'react/lib/update';
import actions from '../../app/actions/'

function appReducer(state, action) {

  if(!state) {
    state = {
      showAddDialog: false
    }
  }

  switch(action.type) {
    case 'TOGGLE_ADD_DIALOG':
      return Object.assign({}, state, {showAddDialog: !state.showAddDialog});
    default:
      return state;
  }
}

module.exports = appReducer;