function removeTitleAttributes(dom) {
  const links = dom.window.document.querySelectorAll("a[title]");
  for (let link of links) {
    link.removeAttribute("title");
  }
}

function removeNode(dom, selector) {
  const item = dom.window.document.querySelector(selector);
  if (item) {
    item.parentNode.removeChild(item);
  }
}

module.exports = {
  removeTitleAttributes,
  removeNode
};
