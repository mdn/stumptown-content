const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');

const related = require('./related-content');
const links = require('./build-link-lists');
const markdown = require('./markdown-converter');

const { ROOT } = require('./constants');

function buildLinkList(groupSpec) {
    if (groupSpec.pages) {
        return links.linkListFromFilePaths(groupSpec.title, groupSpec.pages, true);
    } else if (groupSpec.chapter_list) {
        return links.linkListFromChapterList(groupSpec.chapter_list, true);
    } else if (groupSpec.directory) {
        return links.linkListFromDirectory(groupSpec.title, groupSpec.directory, true);
    }
}

async function buildLandingPageJSON(elementPath, data, content) {
    const overview = {
        type: "prose",
        value: {
            title: "Overview",
            id: "overview",
            content: await markdown.markdownToHTML(content)
        }
    };
    const linkLists = await Promise.all(data.groups.map(async groupSpec => {
        const linkList = await buildLinkList(groupSpec);
        return {
            type: "link_list",
            value: linkList
        };
    }));
    return {
        title: data.title,
        mdn_url: data.mdn_url,
        related_content: await related.buildRelatedContent(data.related_content),
        body: [ overview, ...linkLists]
    };
}

module.exports = {
    buildLandingPageJSON
}
