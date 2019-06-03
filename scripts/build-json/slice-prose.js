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
  'Short description',
  'Overview',
  'Attributes',
  'Usage notes',
  'Accessibility concerns',
  'See also'
];

function sectionNameToSlug(sectionName) {
    return sectionName.toLowerCase().replace(' ', '_');
}

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
    const sectionContent = extractFromSiblings(node, 'H2', 'html');
    const extraSections = [];

    if (namedSections.includes(sectionName)) {
        const sectionSlug = sectionNameToSlug(sectionName);
        sections[sectionSlug] = {
            title: sectionName,
            content: sectionContent
        }
    } else {
        const additionalSection = {
            title: sectionName,
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
        if (node.nodeName === 'H2') {
            getSection(node, sections);
        }
        node = node.nextSibling;
    }
    return sections;
}

module.exports = {
    package
}
