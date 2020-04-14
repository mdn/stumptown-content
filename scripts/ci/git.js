/**
 * Check that there are no problems with the code from git.
 */
const spawn = require("child_process").spawnSync;

function spawnStr(cmd, ...args) {
  const spawned = spawn(cmd, ...args);
  return spawned.stdout.toString().trim();
}

const foundLines = spawnStr("git", ["grep", "-n", ">>>>>>>"])
  .split(/\n/g)
  .filter((line) => {
    return !(line.includes(".travis.yml") || line.includes("scripts/ci/"));
  });
if (foundLines.length) {
  console.warn("The following lines look like git diff markers:");
  for (let line of foundLines) {
    console.log(line);
  }
  process.exitCode = 1;
}
