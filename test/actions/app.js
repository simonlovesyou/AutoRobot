import actions from '../../app/actions/';
import chai from 'chai';
import thunk from 'redux-thunk';

const assert = chai.assert,
      expect = chai.expect;

let testedActions = 0;

module.exports = () => {

  describe("App actions", () => {
    describe("toggleAddDialog", () => {
      it("should return the correct action", () => {
        let expected = {
          type: 'TOGGLE_ADD_DIALOG'
        };

        let result = actions.app.toggleAddDialog();

        expect(result).to.deep.equal(expected);
      });
    });
  });
}