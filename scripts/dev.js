import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const commands = [
  {
    name: "backend",
    command: process.execPath,
    args: ["--watch", path.join(root, "backend", "src", "server.js")],
    cwd: path.join(root, "backend")
  },
  {
    name: "frontend",
    command: process.execPath,
    args: [path.join(root, "frontend", "node_modules", "vite", "bin", "vite.js"), "--host", "0.0.0.0"],
    cwd: path.join(root, "frontend")
  }
];

const children = commands.map(({ name, command, args, cwd }) => {
  const child = spawn(command, args, {
    cwd,
    stdio: "pipe",
    shell: false,
    env: { ...process.env, FORCE_COLOR: "1" }
  });

  child.stdout.on("data", (data) => process.stdout.write(`[${name}] ${data}`));
  child.stderr.on("data", (data) => process.stderr.write(`[${name}] ${data}`));

  child.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      console.error(`[${name}] exited with code ${code}`);
    }
  });

  child.on("error", (error) => {
    console.error(`[${name}] ${error.message}`);
  });

  return child;
});

const stop = () => {
  children.forEach((child) => child.kill());
  process.exit(0);
};

process.on("SIGINT", stop);
process.on("SIGTERM", stop);

