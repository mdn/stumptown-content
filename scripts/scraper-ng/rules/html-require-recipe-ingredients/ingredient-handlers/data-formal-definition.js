function handleDataFormalDefinition(tree, logger) {
  const id = "Formal_definition";
  const body = select(`body`, tree);
  const heading = select(`h2#${id}`, body);
}

module.exports = handleDataFormalDefinition;
