import {ipcRenderer} from 'electron';
import {create} from 'creatable';

let DOM;

ipcRenderer.on('window.create', (event, message) => {

  console.log(message);

  let windowID = message.windowID;

  DOM = message.DOM

  console.log(DOM, windowID);

  DOM = recursiveCreate(DOM, windowID);

  console.log({DOM})

  document.body.appendChild(DOM);

});

function recursiveCreate(node, windowID) {

  let element = document.createElement(node.selector);

  for(var attr in node) {
    console.log("Attribute: " + attr + ": " + node[attr]);
    if(node.hasOwnProperty(attr)) {

      if(attr.toUpperCase() !== 'SELECTOR' && attr.toUpperCase() !== 'CHILDREN') {
        element[attr] = node[attr]; 
      } 
    }
  }

  if(node['userland-events']) {
    node['userland-events'].forEach((e) => {
      let elementID = element['data-id'],
          eventID = element['data-id'] + e;
      console.log(windowID);

      element.addEventListener(e.replace('on', ''), () => emitEvent(windowID, elementID, eventID, element.id, DOM));
    });
  }

  if(node.children) {
    node.children.forEach((child) => element.appendChild(recursiveCreate(child, windowID)));
  } 
  return element;
}

function emitEvent(windowID, elementID, eventID, nativeID, DOM) {
  console.log(windowID, elementID, eventID);
  let domElement = document.getElementById(nativeID);
  console.log({domElement});
  let value = domElement.value;
  domElement["value"] = value; // ?? Konstigt
  console.log(value);
  console.log('#' + nativeID);
  ipcRenderer.send('userland.event', {windowID, elementID, eventID, domElement, DOM});
}

/*
console.log("Sending message as " + (element['data-id'] + attr));
            ipcRenderer.send(element['data-id'] + attr, {windowId: id, buttonId: button.id});
            */