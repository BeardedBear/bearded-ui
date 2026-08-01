/**
 * Automate the release process:
 *   1. Check the working tree is clean and the tag is free
 *   2. Run tests, typecheck and build — never publish something that doesn't build
 *   3. Bump version in package.json, commit and push on the current branch
 *   4. Force the `release` branch onto that commit, with `dist/` committed
 *   5. Tag that commit and push branch + tag
 *
 * Why a release branch carrying `dist/`: consumers install straight from git,
 * and bun runs the `prepare` script *without* installing the package's
 * devDependencies — so `vite` is missing and the build never happens on their
 * side. Shipping `dist/` on a dedicated branch keeps `main` free of build
 * artifacts while making the install work with no build step at all.
 *
 * Consumers pick their update policy through the git ref:
 *   bun add github:BeardedBear/bearded-ui#release   # always the latest release
 *   bun add github:BeardedBear/bearded-ui#v0.2.0    # pinned
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

/** Branch consumers track to always get the latest release, `dist/` included. */
const RELEASE_BRANCH = "release";

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

// `dist/` is about to be published: a broken build must fail here, not in a consumer's install.
console.log(`\n  ${currentVersion} → ${newVersion}\n`);
console.log("  Validating…\n");
runVerbose("bun run build");

pkg.version = newVersion;
writeJson(pkgPath, pkg);

run(`git add ${pkgPath}`);
run(`git commit -m "chore(release): bump version to ${newVersion}"`);
run("git push origin HEAD");

/*
 * The release commit sits on its own branch: same tree as the source branch,
 * plus `dist/` forced in past .gitignore. The tag points here, so a pinned
 * install gets the built files too.
 */
const sourceBranch = run("git rev-parse --abbrev-ref HEAD");
try {
  run(`git checkout -B ${RELEASE_BRANCH}`);
  run("git add --force dist");
  run(`git commit -m "release v${newVersion}"`);
  run(`git tag v${newVersion}`);
  run(`git push --force origin ${RELEASE_BRANCH}`);
  run(`git push origin v${newVersion}`);
} finally {
  // Always come back, even if a push failed halfway through.
  run(`git checkout ${sourceBranch}`);
}

console.log(`\n  v${newVersion} released on branch "${RELEASE_BRANCH}".`);
console.log(`  bun add github:BeardedBear/bearded-ui#${RELEASE_BRANCH}   (latest)`);
console.log(`  bun add github:BeardedBear/bearded-ui#v${newVersion}   (pinned)\n`);
