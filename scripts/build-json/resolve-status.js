function packageStatus(specifications, bcd) {
  const hasStatus = bcd.__compat !== undefined && bcd.__compat.status !== undefined;
  return {
    non_standard: specifications === "non-standard",
    experimental: hasStatus && bcd.__compat.status.experimental,
    deprecated: hasStatus && bcd.__compat.status.deprecated
  };
}

module.exports = {
  packageStatus
};
