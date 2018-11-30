/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function DOMNodeCollection(html) {\n  this.html = html;\n}\n\nDOMNodeCollection.prototype.html = function (string) {\n  if (!string) {\n    return this[0].innerHTML;\n  }\n  this.forEach( el => {\n    el.innerHTML = string;\n  });\n};\nDOMNodeCollection.prototype.empty = function () {\n  this.forEach( el => {\n    el.innerHTML = '';\n  });\n};\n\nDOMNodeCollection.prototype.append = function(children) {\n  if (this.html.length === 0) return;\n  if (typeof children === 'object' && !(children instanceof DomNodeCollection)) {      \n    children = $l(children);\n  }\n  if (typeof children === \"string\") {\n    this.each((item) => {\n      item.innerHTML += children;\n    });\n  } else if (children instanceof DomNodeCollection) {      \n    this.each((item) => {\n      children.each((childNode) => {\n        item.appendChild(childNode.cloneNode(true));\n      });\n    });\n  }\n};\n\nDOMNodeCollection.prototype.attr = function (key,val) {\n  if (typeof val === \"string\") {\n    this.each(node => node.setAttribute(key, val));\n  } else {\n    return this.nodes[0].getAttribute(key);\n  }\n\n};\nDOMNodeCollection.prototype.addClass = function (newClass) {\n  this.each(node => node.classList.add(newClass));\n};\nDOMNodeCollection.prototype.removeClass = function (oldClass) {\n  this.each(node => node.classList.remove(oldClass));\n\n};\n\nDOMNodeCollection.prototype.children = function () {\n  let childNodes = [];\n  this.each( node => {\n    childNodes = childNodes.concat(Array.from(node.children));\n  });\n  return new DOMNodeCollection(childNodes);\n};\n\nDOMNodeCollection.prototype.parent = function (el) {\n  const parentnodes = [];\n  this.each((parentnode) => {\n    if(!parentnode.visited){\n      parentnodes.push(parentnode);\n      parentnode.visited = true;\n    }\n  });\n  parentnodes.forEach((node) => {\n    node.visited = false;\n  });\n  return new DomNodeCollection(parentnodes);\n};\n\nDOMNodeCollection.prototype.find = function (selector) {\n  let nodes = [];\n  this.each(node => {\n    nodes = nodes.concat(Array.from(node.querySelectorAll(selector)));\n  });\n  return new DomNodeCollection(nodes);\n};\n\nDOMNodeCollection.prototype.remove = function () {\n  this.html.each( node => node.parentNode.removeChild(node));\n};\n\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nwindow.$l = (arg1) => {\n  const nodeList = document.querySelectorAll(arg1);\n  // debugger\n  console.dir(nodeList);\n  const nodeArray = Array.from(nodeList);\n  console.dir(nodeArray);\n  if (arg1 instanceof HTMLElement) {\n    return new DOMNodeCollection(nodeArray);\n  }\n};\n\n\n\n// window.$l('li');\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });