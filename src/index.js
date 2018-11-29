const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = (arg1) => {
  const nodeList = document.querySelectorAll(arg1);
  // debugger
  console.dir(nodeList);
  const nodeArray = Array.from(nodeList);
  console.dir(nodeArray);
  if (arg1 instanceof HTMLElement) {
    return new DOMNodeCollection(nodeArray);
  }
};



// window.$l('li');