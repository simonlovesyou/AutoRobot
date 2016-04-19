const log = (scriptSrc, store, dev) => 
  message => {
    store.dispatch(addLog(scriptSrc, message));
    if(dev) {
      console.log(message);
    }
  }


const addLog = (scriptSrc, log) => ({
  type: 'SCRIPT_ADD_LOG',
  src: scriptSrc,
  log
});


module.exports = {
  log,
  addLog
}