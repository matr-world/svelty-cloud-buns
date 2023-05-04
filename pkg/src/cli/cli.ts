#! /usr/bin/env bun

import path from "path";
import fs from "fs";
import childProcess from "child_process";

const pkgPath = path.join(process.cwd() + "/package.json");

const isDev = process.argv.includes("--dev");

const {
  scb : config = {}
} = JSON.parse(fs.readFileSync(pkgPath).toString() || "{}");

const {
  entry = "src/index.ts",
} = config;

const src = path.join(process.cwd(), entry);
const dist = path.join(process.cwd(), ".scb/compiled");
const generate = path.join(__dirname, "generate.ts");

const args = `${isDev ? "--watch" : ""} -- --entry ${src} --out ${dist} --dev ${isDev}`;

console.log({args});

childProcess.exec(`bun run ${generate} ${args}`,
  (err, stdout, stderr) => console.log(err, stdout, stderr)
);