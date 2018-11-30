function DOMNodeCollection(html) {
  this.html = html;
}

DOMNodeCollection.prototype.html = function (string) {
  if (!string) {
    return this[0].innerHTML;
  }
  this.forEach( el => {
    el.innerHTML = string;
  });
};
DOMNodeCollection.prototype.empty = function () {
  this.forEach( el => {
    el.innerHTML = '';
  });
};

DOMNodeCollection.prototype.append = function(children) {
  if (this.html.length === 0) return;
  if (typeof children === 'object' && !(children instanceof DomNodeCollection)) {      
    children = $l(children);
  }
  if (typeof children === "string") {
    this.each((item) => {
      item.innerHTML += children;
    });
  } else if (children instanceof DomNodeCollection) {      
    this.each((item) => {
      children.each((childNode) => {
        item.appendChild(childNode.cloneNode(true));
      });
    });
  }
};

DOMNodeCollection.prototype.attr = function (key,val) {
  if (typeof val === "string") {
    this.each(node => node.setAttribute(key, val));
  } else {
    return this.nodes[0].getAttribute(key);
  }

};
DOMNodeCollection.prototype.addClass = function (newClass) {
  this.each(node => node.classList.add(newClass));
};
DOMNodeCollection.prototype.removeClass = function (oldClass) {
  this.each(node => node.classList.remove(oldClass));

};

DOMNodeCollection.prototype.children = function () {
  let childNodes = [];
  this.each( node => {
    childNodes = childNodes.concat(Array.from(node.children));
  });
  return new DOMNodeCollection(childNodes);
};

DOMNodeCollection.prototype.parent = function (el) {
  const parentnodes = [];
  this.each((parentnode) => {
    if(!parentnode.visited){
      parentnodes.push(parentnode);
      parentnode.visited = true;
    }
  });
  parentnodes.forEach((node) => {
    node.visited = false;
  });
  return new DomNodeCollection(parentnodes);
};

DOMNodeCollection.prototype.find = function (selector) {
  let nodes = [];
  this.each(node => {
    nodes = nodes.concat(Array.from(node.querySelectorAll(selector)));
  });
  return new DomNodeCollection(nodes);
};

DOMNodeCollection.prototype.remove = function () {
  this.html.each( node => node.parentNode.removeChild(node));
};


module.exports = DOMNodeCollection;