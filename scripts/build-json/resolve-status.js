function packageStatus(specifications, bcd) {
  const hasStatus =
    bcd.__compat !== undefined && bcd.__compat.status !== undefined;
  const status = [];
  if (specifications === "non-standard") {
    status.push("non_standard");
  }
  if (hasStatus && bcd.__compat.status.experimental) {
    status.push("experimental");
  }
  if (hasStatus && bcd.__compat.status.deprecated) {
    status.push("deprecated");
  }
  return status;
}

module.exports = {
  packageStatus
};
