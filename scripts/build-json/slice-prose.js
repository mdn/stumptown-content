const fs = require('fs');
const path = require('path');

const yaml = require('js-yaml');
const matter = require('gray-matter');
const marked = require('marked');
const jsdom = require('jsdom');
const bcd = require('mdn-browser-compat-data');

const { JSDOM } = jsdom;
const commentNode = 8;
const namedSections = [
  'short-description',
  'overview',
  'attributes-text',
  'usage-notes',
  'accessibility-concerns',
  'see-also'
];

function extractFromSiblings(node, terminatorTag, contentType) {
    let content = '';
    let sib = node.nextSibling;
    while (sib && sib.nodeName != terminatorTag) {
        if (sib.outerHTML) {
            if (contentType === 'html') {
                content += sib.outerHTML;
            } else if (contentType === 'text') {
                content += sib.textContent;
            }
        }
        sib = sib.nextSibling;
    }
    return content;
}

function getSection(node, sections) {
    const sectionName = node.textContent.trim();
    const sectionContent = extractFromSiblings(node, '#comment', 'html');
    const extraSections = [];

    if (namedSections.includes(sectionName)) {
        sections[sectionName] = sectionContent;
    } else {
        const additionalSection = {
            name: sectionName,
            content: sectionContent
        };
      sections['additional-sections'].push(additionalSection);
    }
}

function package(prosePath) {
    const proseMD = fs.readFileSync(prosePath, 'utf8');
    const dom = JSDOM.fragment(marked(proseMD));
    const sections = {
        'additional-sections': []
    };
    let node = dom.firstChild;
    while (node) {
        if (node.nodeType === commentNode) {
            getSection(node, sections);
        }
        node = node.nextSibling;
    }
    return sections;
}

module.exports = {
    package
}
