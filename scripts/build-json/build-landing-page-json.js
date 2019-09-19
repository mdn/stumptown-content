const related = require('./related-content');
const links = require('./build-link-lists');
const markdown = require('./markdown-converter');

/**
 * Build a single list of links.
 *
 * These may be specified in one of three ways:
 * - an explicitly enumerated list of pages
 * - a reference to a "chapter_list" YAML file, which enables lists of pages to be shared
 * - a reference to a directory, which means "include links to all the pages in this directory"
 */
function buildLinkList(listSpec) {
    if (listSpec.pages) {
        return links.linkListFromFilePaths(listSpec.title, listSpec.pages, true);
    } else if (listSpec.chapter_list) {
        return links.linkListFromChapterList(listSpec.chapter_list, true);
    } else if (listSpec.directory) {
        return links.linkListFromDirectory(listSpec.title, listSpec.directory, true);
    } else {
        throw new Error(`Unrecognized list spec '${JSON.stringify(listSpec)}'`);
    }
}

/**
 * Build a single landing page.
 * A landing page consists of some overview text followed by one or more
 * "link lists".
 *
 * A link list is just a representation of a list of links.
 * It consists of some short text describing the list, followed by the links.
 * Each link contains a title and a URL, and may optionally also contain
 * a short description.
 */
async function buildLandingPageJSON(elementPath, data, content) {
    const overview = {
        type: "prose",
        value: {
            title: "Overview",
            id: "overview",
            content: await markdown.markdownToHTML(content)
        }
    };
    const linkLists = await Promise.all(data.link_lists.map(async listSpec => {
        const linkList = await buildLinkList(listSpec);
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
