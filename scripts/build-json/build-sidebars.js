const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');

const sidebarDir = path.join(process.cwd(), 'content', 'sidebars');
const packagedDir = path.join(process.cwd(),'packaged', 'sidebars');

/**
 * Get a single sidebar item from front matter
 */
function sidebarItemFromFile(filePath) {
  const {data} = matter(fs.readFileSync(filePath, 'utf8'));
  return {
    title: data.title,
    mdn_url: data.mdn_url
  };
}

/**
 * Get a single sidebar item from meta.yaml
 */
function sidebarItemFromMeta(metaPath) {
  const meta = yaml.safeLoad(fs.readFileSync(metaPath, 'utf8'));
  return {
    title: meta.title,
    mdn_url: meta['mdn-url']
  };
}

/**
 * Build a sidebar section from a special YAML file called a "chapter list"
 * that is just an ordered list of pages.
 */
function sectionFromChapterList(chapterListPath) {
  const fullPath = path.join(process.cwd(), chapterListPath);
  const fullDir = path.dirname(fullPath);
  const chapterList = yaml.safeLoad(fs.readFileSync(fullPath, 'utf8'));
  const chapterPaths = chapterList.chapters.map(chapter => path.join(fullDir, chapter));
  return {
    title: chapterList.title,
    content: chapterPaths.map(sidebarItemFromFile)
  }
}

/**
 * Build a sidebar section from a directory:
 * - list all the children of this directory.
 */
function sectionFromDirectory(directory) {
  const fullPath = path.join(process.cwd(), directory);
  let itemDirectories = fs.readdirSync(path.join(process.cwd(), directory));
  itemDirectories = itemDirectories.map(itemDirectory => path.join(fullPath, itemDirectory, 'meta.yaml'));
  return itemDirectories.map(sidebarItemFromMeta);
}

/**
 * Build a single sidebar section.
 * A section may be either:
 * - an array which itself contains sidebar sections
 * - the name of a YAML file that lists pages to include in the section
 * - the name of a directory whose children to list
 */
function buildSidebarSection(sectionSpec) {
  if (sectionSpec.children) {
    return {
      title: sectionSpec.title,
      content: sectionSpec.children.map(buildSidebarSection)
    };
  } else if (sectionSpec.chapter_list) {
    return sectionFromChapterList(sectionSpec.chapter_list);
  } else if (sectionSpec.directory)  {
    return {
      title: sectionSpec.title,
      content: sectionFromDirectory(sectionSpec.directory)
    };
  } else {
    throw('Sidebar section does not contain expected type');
  }
}

/**
 * Build a single sidebar given its YAML file.
 * At the top level a sidebar is an array of sidebar sections.
 */
function buildSingleSidebar(sidebarSpecName) {
  const sidebarSpec = yaml.safeLoad(fs.readFileSync(path.join(sidebarDir, sidebarSpecName), 'utf8'));
  const sidebarSections = sidebarSpec.map(buildSidebarSection);
  const dest = path.join(packagedDir, `${sidebarSpecName.split('.')[0]}.json`);
  fs.writeFileSync(dest, `${JSON.stringify(sidebarSections, null, 2)}`);
  console.log(`Built sidebar: ${sidebarSpecName}`);
}

/**
 * Build all the sidebars found under content/sidebars
 */
function buildSidebars() {
  if (!fs.existsSync(packagedDir)) {
    fs.mkdirSync(packagedDir, { recursive: true });
  }
  const sidebarSpecNames = fs.readdirSync(sidebarDir);
  sidebarSpecNames.map(buildSingleSidebar);
  return 0;
}

process.exitCode = buildSidebars();
