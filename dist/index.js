#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const default_1 = require("./commands/default");
const program = new commander_1.Command();
program
    .name("tree-me")
    .description("Generate MDX project structure with tree and links")
    .argument("[directory]", "Directory to scan", "src")
    .action((dir) => {
    (0, default_1.handleDefaultCommand)(dir);
});
program.parse();
