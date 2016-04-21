import reducers from '../app/reducers';
import actions from '../app/actions/';
import chai from 'chai';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import update from 'react/lib/update'
import fs from 'fs';

const assert = chai.assert,
      expect = chai.expect;

let store;

module.exports = function() {
  describe('Reducers', () => {

    beforeEach(() => {
      store = createStore(reducers, applyMiddleware(thunk));
    });

    describe('Store', () => {
      it("should return the default state", () => {
        let state = store.getState();

        let expected = {
          scripts: {},
          activeScript: {}
        }
        expect(state).to.deep.equal(expected);
      });
    });

    describe('LOAD_SCRIPT_PENDING', () => {
      it("should return the correct state with a status of pending", () => {

        let scriptPath = __dirname + '/scripts/ValidSyntax.js';

        store.dispatch(actions.scripts.loadScriptPending(scriptPath, 'name', 'Pending'));
        let state = store.getState();

        let expected = update({}, {
          scripts: {
            $set: {
              [scriptPath]: {
                status: 'Pending',
                name: 'name'
              }
            },
          },
          activeScript: {
            $set: {}
          }
        });

        assert(Boolean(state.scripts[scriptPath]), true);
        expect(state).to.deep.equal(expected);
      });
    });
    describe('REFRESH_SCRIPT_PENDING', (done) => {
      it("should return the correct state with a status of pending", (done) => {

        let scriptPath = __dirname + '/scripts/ValidSyntax.js';

        store.dispatch(actions.scripts.refreshScriptPending(scriptPath, 'Pending'));

        let state = store.getState();

        let expected = update({}, {
          scripts: {
            $set: {
              [scriptPath]: {
                status: 'Pending'
              }
            },
          },
          activeScript: {
            $set: {
              status: 'Pending'
            }
          }
        });

        assert(Boolean(state.scripts[scriptPath]), true);
        expect(state).to.deep.equal(expected);
        done();
       
      });
    });
    describe('REFRESH_SCRIPT', (done) => {
      it("should return a state with a script with Syntax error and then refresh it to a status of OK", (done) => {

        let scriptPath = __dirname + '/scripts/InvalidTemp.js';

        fs.writeFileSync(scriptPath, 'vra fest = \'fest\'');

        store.dispatch(actions.scripts.loadScript(scriptPath, 'Temp'))
        .then(() => {

          fs.writeFileSync(scriptPath, 'var fest = \'fest\'');

          store.dispatch(actions.scripts.refreshScript(scriptPath, 'Temp'))
          .then(() => {

            let state = store.getState();

            let expected = update({}, {
              scripts: {
                $set: {
                  [scriptPath]: {
                    code: '\'use strict\';\n\nvar fest = \'fest\';',
                    status: 'OK',
                    errors: [],
                    logs: [],
                    validated: true,
                    active: false,
                    name: 'Temp',
                    content: 'var fest = \'fest\''
                  }
                },
              },
              activeScript: {
                $set: {
                  code: '\'use strict\';\n\nvar fest = \'fest\';',
                  status: 'OK',
                  errors: [],
                  logs: [],
                  validated: true,
                  active: false,
                  name: 'Temp',
                  content: 'var fest = \'fest\''
                }
              }
            });

            assert(Boolean(state.scripts[scriptPath]), true);
            expect(state.scripts).to.deep.equal(expected.scripts);
            done();
          });
       
        })
      });
    });

    describe('LOAD_SCRIPT_SUCCESS', () => {
      it("should return the correct state with an script of OK status", (done) => {
        let scriptPath = __dirname + '/scripts/ValidSyntax.js';

        let expected = update({}, {
          scripts: {
            $set: {
              [scriptPath]: {
                code: '"use strict";\n\nconsole.log("Hey guys");',
                status: 'OK',
                errors: [],
                logs: [],
                validated: true,
                active: false,
                name: 'Test',
                content: 'console.log("Hey guys");'
              }
            },
          },
          activeScript: {
            $set: {}
          }
        });

        store.dispatch(actions.scripts.loadScript(scriptPath, 'Test'))
        .then(e => {
          let state = store.getState();

          assert(Boolean(state.scripts[scriptPath]), true);
          expect(state).to.deep.equal(expected);
          done();
        })
      });
     it("should return the correct state with not OK status", (done) => {
        let scriptPath = __dirname + '/scripts/InvalidSyntax.js';

        let expected = update({}, {
          scripts: {
            $set: {
              [scriptPath]: {
                code: '//Below should be invalid\n\nvra foo = \'foo\';',
                status: 'Syntax Error',
                errors: [],
                logs: [],
                validated: true,
                active: false,
                name: 'Test',
                content: '//Below should be invalid\n\nvra foo = \'foo\';',
                error: new Error()
              }
            },
          },
          activeScript: {
            $set: {}
          }
        });

        store.dispatch(actions.scripts.loadScript(scriptPath, 'Test'))
        .then(e => {
          let state = store.getState();

          assert(state.scripts[scriptPath].error instanceof Error, true);

          //Comparing Error objects is hard, which is why I remove them.
          state.scripts[scriptPath].error = '';
          expected.scripts[scriptPath].error = '';
          expect(state).to.be.deep.equal(expected);

          done();

        })
      });
    });
    describe('LOAD_SCRIPT_UNSUCCESS', () => {
      it("should return the correct state with the status ENOENT and error being an instance of Error", (done) => {
        
        let scriptPath = __dirname + '/does/not/exist.js';

        store.dispatch(actions.scripts.loadScript(scriptPath, 'Test'))
        .then(e => {
          let state = store.getState();

          assert(state.scripts[scriptPath].error instanceof Error, true);
          assert(Boolean(state.scripts[scriptPath].status.match(/(ENOENT)/)), true);
          done();
        })
      });
    });
    describe('ADD_SCRIPT_LOG', (done) => {
      it("should return the correct state with an added message", (done) => {

        let scriptPath = __dirname + '/scripts/ValidSyntax.js';

        let expected = update({}, {
          scripts: {
            $set: {
              [scriptPath]: {
                code: '"use strict";\n\nconsole.log("Hey guys");',
                status: 'OK',
                errors: [],
                logs: ['Message'],
                validated: true,
                active: false,
                name: 'Test',
                content: 'console.log("Hey guys");'
              }
            },
          },
          activeScript: {
            $set: {
              code: '"use strict";\n\nconsole.log("Hey guys");',
              status: 'OK',
              errors: [],
              logs: ['Message'],
              validated: true,
              active: false,
              name: 'Test',
              content: 'console.log("Hey guys");'
            }
          }
        });

        store.dispatch(actions.scripts.loadScript(scriptPath, 'Test'))
        .then(e => {
          //toggleScript has to get dispatched for the user to dispatch addLog
          store.dispatch(actions.scripts.toggleScript(scriptPath));
          store.dispatch(actions.scripts.addLog(scriptPath, 'Message'));
          let state = store.getState();
          assert(Boolean(state.scripts[scriptPath]), true);
          expect(state.scripts).to.deep.equal(expected.scripts);
          done();
        });
      });
      it("should return the correct state with an added error object to log", (done) => {

        let scriptPath = __dirname + '/scripts/ValidSyntax.js';

        let expected = update({}, {
          scripts: {
            $set: {
              [scriptPath]: {
                code: '"use strict";\n\nconsole.log("Hey guys");',
                status: 'OK',
                errors: [],
                logs: [new Error()],
                validated: true,
                active: false,
                name: 'Test',
                content: 'console.log("Hey guys");'
              }
            },
          },
          activeScript: {
            $set: {
              code: '"use strict";\n\nconsole.log("Hey guys");',
              status: 'OK',
              errors: [],
              logs: [new  Error()],
              validated: true,
              active: false,
              name: 'Test',
              content: 'console.log("Hey guys");'
            }
          }
        });

        store.dispatch(actions.scripts.loadScript(scriptPath, 'Test'))
        .then(e => {
          
          //toggleScript has to get dispatched for the user to dispatch addLog
          store.dispatch(actions.scripts.toggleScript(scriptPath));
          store.dispatch(actions.scripts.addLog(scriptPath, new Error()));
          let state = store.getState();
          assert(Boolean(state.scripts[scriptPath]), true);
          expect(state.scripts).to.deep.equal(expected.scripts);
          done();
        });
      });
    });
  });
}