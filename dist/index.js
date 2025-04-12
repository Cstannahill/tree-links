#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const default_1 = require("./commands/default");
const program = new commander_1.Command();
program
    .name("tree-links")
    .description("Generate GitHub-style file links from a directory")
    .argument("[directory]", "Directory to scan", ".")
    .option("--base <url>", "Base URL (e.g., GitHub repo)")
    .option("--out <file>", "Save output to file")
    .option("--format <type>", "Output format (txt, md, mdx, json)", "txt")
    .option("--tree", "Print tree structure")
    .option("--depth <n>", "Limit recursion depth", parseInt)
    .action(default_1.handleDefaultCommand);
program
    .command("markdown")
    .description("Alias: generate markdown link output")
    .argument("[directory]", "Directory to scan", ".")
    .option("--out <file>", "Save to file")
    .action((dir, opts) => {
    (0, default_1.handleDefaultCommand)(dir, { ...opts, format: "md" });
});
program.parse();
