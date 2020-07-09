const listSectionHandler = require("./property-lists");

const handleDataConstituentProperties = listSectionHandler({
  id: "Constituent_properties",
  introText: "This property is a shorthand for the following CSS properties:",
  minimumListItems: 2,
});

module.exports = handleDataConstituentProperties;
