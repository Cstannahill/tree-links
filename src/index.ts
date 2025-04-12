#!/usr/bin/env node

import { Command } from "commander";
import { handleDefaultCommand } from "./commands/default";

const program = new Command();

program
  .name("tree-me")
  .description("Generate MDX project structure with tree and links")
  .argument("[directory]", "Directory to scan", "src")
  .action((dir) => {
    handleDefaultCommand(dir);
  });

program.parse();
