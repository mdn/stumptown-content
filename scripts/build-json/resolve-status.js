function packageStatus(specifications, bcd) {
  const bcdHasStatus = !!bcd.__compat && !!bcd.__compat.status;
  return {
    non_standard: specifications === "non-standard",
    experimental: bcdHasStatus && bcd.__compat.status.experimental,
    deprecated: bcdHasStatus && bcd.__compat.status.deprecated
  };
}

module.exports = {
  packageStatus
};
