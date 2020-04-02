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

function removeBrowserCompatibility(dom) {
  // Find the start of the compat section
  const heading = dom.window.document.querySelector("#Browser_compatibility");

  // Wrap the content the compat section in a div (stopping at the next heading
  // or the end of the page)
  const sectionWrapper = dom.window.document.createElement("div");
  sectionWrapper.id = "bcd-section-wrapper";

  let current = heading.nextElementSibling;
  while (current !== null && current.tagName !== "H2") {
    const next = current.nextElementSibling;
    sectionWrapper.appendChild(current);
    current = next;
  }
  heading.parentNode.insertBefore(sectionWrapper, heading.nextElementSibling);

  // Remove any .hidden elements in the compat section
  const hiddenElements = dom.window.document.querySelectorAll(
    "#bcd-section-wrapper .hidden"
  );
  hiddenElements.forEach((hidden) => hidden.remove());

  if (sectionWrapper.hasChildNodes()) {
    console.error("There's unexpected content in the BCD section.");
    console.error(sectionWrapper.innerHTML);
    process.exit(1);
  }

  // Finally remove the BCD source
  heading.remove();
  sectionWrapper.remove();
}

module.exports = {
  removeBrowserCompatibility,
  removeNode,
  removeTitleAttributes,
};
