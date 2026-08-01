/**
 * Automate the release process:
 *   1. Check the working tree is clean and the tag is free
 *   2. Run tests, typecheck and build — never tag something that doesn't build
 *   3. Bump version in package.json
 *   4. Commit the version bump
 *   5. Tag the commit
 *   6. Push commit + tag
 *
 * Consumers install from the tag:
 *   bun add github:BeardedBear/bearded-ui#v0.2.0
 *
 * Usage:
 *   bun run release 0.2.0        # explicit version
 *   bun run release patch        # 0.1.0 → 0.1.1
 *   bun run release minor        # 0.1.0 → 0.2.0
 *   bun run release major        # 0.1.0 → 1.0.0
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

function bump(version: string, part: "major" | "minor" | "patch"): string {
  const [major, minor, patch] = version.split(".").map(Number);
  if (part === "major") return `${major + 1}.0.0`;
  if (part === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

function readJson(path: string): Record<string, unknown> {
  return JSON.parse(readFileSync(path, "utf-8"));
}

function run(cmd: string): string {
  return execSync(cmd, { encoding: "utf-8", stdio: ["pipe", "pipe", "inherit"] }).trim();
}

/** Streams to the terminal: long commands shouldn't run silently. */
function runVerbose(cmd: string): void {
  execSync(cmd, { stdio: "inherit" });
}

function writeJson(path: string, data: Record<string, unknown>): void {
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}

const arg = process.argv[2];

if (!arg) {
  console.error("Usage: bun run release <version|patch|minor|major>");
  process.exit(1);
}

const pkgPath = "package.json";
const pkg = readJson(pkgPath);
const currentVersion = pkg.version as string;

let newVersion: string;
if (arg === "patch" || arg === "minor" || arg === "major") {
  newVersion = bump(currentVersion, arg);
} else if (/^\d+\.\d+\.\d+$/.test(arg)) {
  newVersion = arg;
} else {
  console.error(`Invalid version: "${arg}". Use a semver string or patch/minor/major.`);
  process.exit(1);
}

const dirty = run("git status --porcelain");
if (dirty) {
  console.error("Working tree is dirty. Commit or stash changes before releasing.");
  process.exit(1);
}

const existingTag = run(`git tag -l v${newVersion}`);
if (existingTag) {
  console.error(`Tag v${newVersion} already exists.`);
  process.exit(1);
}

/*
 * Consumers install straight from git and build the library through `prepare`:
 * a tag that doesn't build breaks their install, not ours. Hence the full check
 * before anything is written.
 */
console.log(`\n  ${currentVersion} → ${newVersion}\n`);
console.log("  Validating…\n");
runVerbose("bun run build");

pkg.version = newVersion;
writeJson(pkgPath, pkg);

run(`git add ${pkgPath}`);
run(`git commit -m "chore(release): bump version to ${newVersion}"`);
run(`git tag v${newVersion}`);
run("git push origin HEAD");
run(`git push origin v${newVersion}`);

console.log(`\n  v${newVersion} tagged and pushed.`);
console.log(`  bun add github:BeardedBear/bearded-ui#v${newVersion}\n`);
