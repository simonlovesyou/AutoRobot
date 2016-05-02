import actions from '../../app/actions/';
import chai from 'chai';
import thunk from 'redux-thunk';

const assert = chai.assert,
      expect = chai.expect;

let testedActions = 0;

module.exports = () => {

  describe("Script actions", () => {
    describe("loadScript", () => {
      it("should return a function", () => {

        let res = actions.scripts.loadScript(__dirname + '/scripts/ValidSyntax.js');
        assert(typeof res, 'function');
      });
    });
    describe("refreshScript", () => {
      it("should return a function", () => {

        let res = actions.scripts.refreshScript(__dirname + '/scripts/ValidSyntax.js');
        assert(typeof res, 'function');
      });
    });

    beforeEach(() => {
      testedActions++;
    })

    describe("loadScriptSuccess", () => {
      it("should return the correct action", () => {
        let scriptPath = __dirname + '/scripts/ValidSyntax.js'

        let expected = {
          type: 'LOAD_SCRIPT_SUCCESSFUL',
          src: scriptPath,
          content: 'console.log("Hey guys");',
          name: 'Test',
          validated: false
        };

        let result = actions.scripts.loadScriptSuccess(scriptPath, 'console.log("Hey guys");', 'Test', false);

        expect(result).to.deep.equal(expected);
      });
    });

    describe("loadScriptUnsuccess", () => {
      it("should return the correct action", () => {

        let scriptPath = __dirname + '/does/not/exist.js';

        let expected = {
          type: 'LOAD_SCRIPT_UNSUCCESSFUL',
          src: scriptPath,
          name: 'Test',
          error: new Error('ENOENT: File not found'),
        };

        let result = actions.scripts.loadScriptUnsuccess(scriptPath, 'Test', new Error('ENOENT: File not found'))

        expect(result).to.deep.equal(expected);

      });
    });

    describe("addLog", () => {
      it("should return the correct action", () => {

        let scriptPath = __dirname + '/some/path.js';

        let expected = {
          type: 'ADD_SCRIPT_LOG',
          src: scriptPath,
          log: 'Message text.'
        };

        let result = actions.scripts.addLog(scriptPath, 'Message text.');

        expect(result).to.deep.equal(expected);
        
      });
    });
    describe("log", () => {
      it("should return a function", () => {

        let scriptPath = __dirname + '/some/path.js';

        let func = actions.scripts.log(scriptPath, 'Message text.');

        assert(typeof func === 'function', true);
        
      });
    });

    describe("loadScriptPending", () => {
      it("should return the correct action", () => {

        let scriptPath = __dirname + '/some/path.js';

        let expected = {
          type: 'LOAD_SCRIPT_PENDING',
          src: scriptPath,
          status: 'Pending',
          name: 'Test'
        };

        let result = actions.scripts.loadScriptPending(scriptPath, 'Test', 'Pending');

        expect(result).to.deep.equal(expected);
        
      });
    });
    describe("refreshScriptPending", () => {
      it("should return the correct action", () => {

        let scriptPath = __dirname + '/some/path.js';

        let expected = {
          type: 'REFRESH_SCRIPT_PENDING',
          name: 'Test',
          src: scriptPath,
          status: 'Pending'
        };

        let result = actions.scripts.refreshScriptPending(scriptPath,'Test', 'Pending');

        expect(result).to.deep.equal(expected);
        
      });
    });
    describe("refreshScriptSuccess", () => {
      it("should return the correct action", () => {

        let expected = {
          type: 'REFRESH_SCRIPT_SUCCESSFUL',
          src: 'Some/src',
          validated: false,
          name: 'name',
          content: 'some code'
        }
        let result = actions.scripts.refreshScriptSuccess('Some/src', 'name', 'some code', false);

        expect(result).to.deep.equal(expected);
      });
    });
    describe("refreshScriptUnsuccess", () => {
      it("should return the correct action", () => {

        let expected = {
          type: 'REFRESH_SCRIPT_UNSUCCESSFUL',
          src: 'Some/src',
          error: new Error('Some error'),
          name: 'name',
        }
        let result = actions.scripts.refreshScriptUnsuccess('Some/src', 'name', new Error('Some error'));

        expect(result).to.deep.equal(expected);
      });
    });
    describe("toggleScript", () => {
      it("should return the correct action", () => {

        let expected = {
          type: 'TOGGLE_SCRIPT',
          src: 'Some/src',
        }
        let result = actions.scripts.toggleScript('Some/src');
        expect(result).to.deep.equal(expected);
      });
    });
    describe("removeScript", () => {
      it("should return the correct action", () => {

        let expected = {
          type: 'REMOVE_SCRIPT',
          src: 'Some/src',
        }
        let result = actions.scripts.removeScript('Some/src');
        expect(result).to.deep.equal(expected);
      });
    });
    describe("All script actions", () => {
      it("should be tested", () => {

        let actual = Object.keys(actions.scripts).length;

        assert(actual === testedActions, (actual-testedActions) + ' actions in app/actions/scripts has not been tested');
      });
    });
  });
}