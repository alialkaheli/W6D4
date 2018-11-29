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

DOMNodeCollection.prototype.attr = function (item) {

};
DOMNodeCollection.prototype.addClass = function (item) {

};
DOMNodeCollection.prototype.removeClass = function (item) {

};

DOMNodeCollection.prototype.children = function () {
  let childNodes = [];
  this.each( node => {
    childNodes = childNodes.concat(Array.from(node.children));
  });
  return new DOMNodeCollection(childNodes);
};


module.exports = DOMNodeCollection;