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

function removeHiddenDivs(dom) {
  const hiddenDivs = dom.window.document.querySelectorAll("div.hidden");
  for (const hiddenDiv of hiddenDivs) {
    hiddenDiv.parentNode.removeChild(hiddenDiv);
  }
}

module.exports = {
  removeHiddenDivs,
  removeNode,
  removeTitleAttributes
};
