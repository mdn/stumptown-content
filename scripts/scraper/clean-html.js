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

function removeBrowserCompatibility(dom) {
  // Note: This assumes that hidden content has been removed and macros have been processed out of dom.

  const compatHeading = dom.window.document.querySelector(
    "#Browser_compatibility"
  );

  // Make sure that there's no content under the compat heading by making sure
  // the next elmeent after the compat heading is another heading.
  const nextElement = compatHeading.nextElementSibling;
  if (nextElement !== null && nextElement.tagName !== "H2") {
    console.error("There's unexpected content in the BCD section.");
    console.error(nextElement, nextElement.tagName, nextElement.innerHTML);
    process.exit(1);
  }

  compatHeading.parentNode.removeChild(compatHeading);
}

module.exports = {
  removeBrowserCompatibility,
  removeHiddenDivs,
  removeNode,
  removeTitleAttributes
};
