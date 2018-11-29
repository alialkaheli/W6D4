window.$l = (arg1) => {
  const nodeList = document.querySelectorAll(arg1);
  debugger
  console.dir(nodeList);
  const nodeArray = Array.from(nodeList);
  console.dir(nodeArray);
};


// window.$l('li');