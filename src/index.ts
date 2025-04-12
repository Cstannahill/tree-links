#!/usr/bin/env node

import { Command } from "commander";
import { handleDefaultCommand } from "./commands/default";

const program = new Command();

program
  .name("tree-links")
  .description("Generate GitHub-style file links from a directory")
  .argument("[directory]", "Directory to scan", ".")
  .option("--base <url>", "Base URL (e.g., GitHub repo)")
  .option("--out <file>", "Save output to file")
  .option("--format <type>", "Output format (txt, md, mdx, json)", "txt")
  .option("--tree", "Print tree structure")
  .option("--depth <n>", "Limit recursion depth", parseInt)
  .action(handleDefaultCommand);

program
  .command("markdown")
  .description("Alias: generate markdown link output")
  .argument("[directory]", "Directory to scan", ".")
  .option("--out <file>", "Save to file")
  .action((dir, opts) => {
    handleDefaultCommand(dir, { ...opts, format: "md" });
  });

program.parse();
