#!/usr/bin/env node

import { Command } from "commander";
import { handleDefaultCommand } from "./commands/default";
// import { getGitBaseUrl } from "./utils/getGitBaseUrl";

const program = new Command();
// let git = getGitBaseUrl(".");
program
  .name("tree-me")
  .description("Generate MDX project structure with tree and links")
  .argument("[directory]", "Directory to scan", ".")
  .action((dir) => {
    handleDefaultCommand(dir);
  });

program.parse();
