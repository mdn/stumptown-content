function packageStatus(specifications, bcd) {
  return {
    non_standard: specifications === "non-standard",
    experimental:
      bcd.__compat !== undefined && bcd.__compat.status.experimental,
    deprecated: bcd.__compat !== undefined && bcd.__compat.status.deprecated
  };
}

module.exports = {
  packageStatus
};
