import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const npmCli = process.env.npm_execpath;

if (!npmCli) {
  console.error("Please run this command with npm: npm.cmd run install:all");
  process.exit(1);
}

for (const folder of ["backend", "frontend"]) {
  console.log(`Installing ${folder} dependencies...`);
  const result = spawnSync(process.execPath, [npmCli, "install"], {
    cwd: path.join(root, folder),
    stdio: "inherit",
    shell: false
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

