const path = require('path');
const markdown = require('./markdown-converter');
const { packageExample } = require('./compose-examples');
const { packageBCD } = require('./resolve-bcd');

async function processDirective(elementPath, directive) {
    const directiveComponents = directive.split(':');
    const directiveName = directiveComponents[0];
    switch (directiveName) {
        case 'embed-example':
            return {
                type: 'examples',
                value: {
                  examples: [await packageExample(path.join(elementPath, directiveComponents[1]))]
                }
            }
        case 'embed-compat':
            return {
                type: 'browser_compatibility',
                value: {
                  query: directiveComponents[1],
                  data: packageBCD(directiveComponents[1])
                }
            }
        default:
            throw ('Unsupported guide directive');
    }
}

async function processProse(elementPath, proseMD) {
    return {
        type: 'prose',
        value: {
          content: await markdown.markdownToHTML(proseMD)
        }
    }
}

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
    }
    return result;
}

module.exports = {
    buildGuideContentJSON
}
