const path = require('path');
const markdown = require('./markdown-converter');
const examples = require('./compose-examples');
const related = require('./related-content');

async function processDirective(elementPath, directive) {
    const directiveComponents = directive.split(':');
    const directiveName = directiveComponents[0];
    switch (directiveName) {
        case 'embed-example':
            return {
                type: 'example',
                content: await examples.packageExample(path.join(elementPath, directiveComponents[1]))
            }
            break;
        default:
            throw ('Unsupported guide directive');
    }
}

async function processProse(elementPath, proseMD) {
    return {
        type: 'prose',
        content: await markdown.markdownToHTML(proseMD)
    }
};

async function buildGuideContentJSON(elementPath, data, content) {
    const result = [];
    const sections = content.split(/({{{{{.*}}}}})/);
    for (let section of sections) {
        let match = section.match(/{{{{{(.*)}}}}}/);
        if (match) {
             result.push(await processDirective(elementPath, match[1]));
        } else {
             result.push(await processProse(elementPath, section));
        }
    };
    return result;
}

async function buildGuidePageJSON(elementPath, data, content) {
    return {
        title: data.title,
        mdn_url: data.mdn_url,
        related_content: related.buildRelatedContent(data.related_content),
        content: await buildGuideContentJSON(elementPath, data, content)
    };
}

module.exports = {
    buildGuidePageJSON
}
