const markdown = require("./markdown-converter");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const namedSections = [
  "Short description",
  "Description",
  "Attributes",
  "Usage notes",
  "Accessibility concerns",
  "See also",
  "Value",
  "Validation",
];

function sectionNameToSlug(sectionName) {
  return sectionName.toLowerCase().replace(" ", "_");
}

function extractFromSiblings(node, terminatorTag, contentType) {
  let content = "";
  let sib = node.nextSibling;
  while (sib && sib.nodeName != terminatorTag) {
    if (sib.outerHTML) {
      if (contentType === "html") {
        content += sib.outerHTML;
      } else if (contentType === "text") {
        content += sib.textContent;
      }
    }
    sib = sib.nextSibling;
  }
  return content;
}

function getSectionValue(node) {
  const sectionName = node.textContent.trim();
  const sectionContent = extractFromSiblings(node, "H2", "html");

  if (namedSections.includes(sectionName)) {
    const sectionId = sectionNameToSlug(sectionName);
    return {
      title: sectionName,
      id: sectionId,
      content: sectionContent,
    };
  } else {
    return {
      title: sectionName,
      content: sectionContent,
    };
  }
}

function packageProse(proseMD) {
  const proseHTML = markdown.markdownToHTML(proseMD);
  const dom = JSDOM.fragment(proseHTML);
  const sections = [];
  let node = dom.firstChild;
  while (node) {
    if (node.nodeName === "H2") {
      const sectionValue = getSectionValue(node);
      sections.push({
        type: "prose",
        value: sectionValue,
      });
    }
    node = node.nextSibling;
  }
  return sections;
}

module.exports = {
  packageProse,
};
