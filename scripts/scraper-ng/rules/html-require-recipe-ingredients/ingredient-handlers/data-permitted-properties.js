const listSectionHandler = require("./property-lists");

const handleDataPermittedProperties = listSectionHandler(
  {
    id: "Permitted_properties",
    introText:
      "Rules whose selectors include this element may only use the following CSS properties:",
    minimumListItems: 1,
  },
  true
);

module.exports = handleDataPermittedProperties;
