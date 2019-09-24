const fetch = require('node-fetch');

const baseURL = 'https://developer.mozilla.org';

/**
 * Given the name of a macro and some HTML,
 * find the first invocation of the macro in the HTML and return
 * the arguments with which the macro was called.
 */
function extractMacroArguments(macroName, html) {
  const regex = new RegExp(`{{\\ ?${macroName}\\((".*?")\\)}}`, 'i');
  const matches = html.match(regex);
  if (!matches || !matches[1]) {
    return null;
  }
  // Split by ",", then strip leading and trailing spaces and double-quotes
  return matches[1].split(',').map(piece => piece.replace(/^[\"\ ]+|[\"\ ]+$/g, ''));
}

function getInteractiveExampleHeight(heightArgument) {
  if (!heightArgument) {
    heightArgument = 'tabbed-standard';
  }
  switch (heightArgument) {
    case 'tabbed-shorter':
        return 'html-short';
    case 'tabbed-standard':
        return 'html-standard';
    case 'tabbed-taller':
        return 'html-tall';
    default:
      throw(`Unexpected interactive example height: ${toMap}`);
  }
}

function extractInteractiveExample(html) {
  const arguments = extractMacroArguments('EmbedInteractiveExample', html);
  if (!arguments) {
    return '';
  }
  const url = `https://interactive-examples.mdn.mozilla.net/${arguments[0]}`;
  const height = getInteractiveExampleHeight(arguments[1]);
  return `interactive_example:\n    url: ${url}\n    height: ${height}\n`;
}

function extractBCD(html) {
  const arguments = extractMacroArguments('Compat', html);
  return arguments? `browser_compatibility: ${arguments[0]}\n`: '';
}

async function scrapeFrontMatter(title, url, md, isGuidePage) {
  const fullURL = `${baseURL}${url}`;
  let frontMatter = `title: ${title}\nmdn_url: ${fullURL}\n`;
  if (!isGuidePage) {
    const withMacrosURL = `${fullURL}?raw`;
    const getWithMacros = await fetch(withMacrosURL);
    const htmlWithMacros = await getWithMacros.text();
    frontMatter += extractInteractiveExample(htmlWithMacros);
    frontMatter += extractBCD(htmlWithMacros);
  }
  return `---\n${frontMatter}---\n${md}`;
}

module.exports = {
    scrapeFrontMatter
};
