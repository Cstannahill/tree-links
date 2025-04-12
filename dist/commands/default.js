"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDefaultCommand = handleDefaultCommand;
// src/commands/default.ts
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const walkDir_1 = require("../utils/walkDir");
const getGitBaseUrl_1 = require("../utils/getGitBaseUrl");
const writeOutput_1 = require("../utils/writeOutput");
async function handleDefaultCommand(directory = ".", options) {
    const dirPath = path_1.default.resolve(directory);
    const format = options.format || "txt";
    console.log(chalk_1.default.gray(`📁 Scanning: ${dirPath}`));
    const files = (0, walkDir_1.walkDir)(dirPath, options.depth);
    if (files.length === 0) {
        console.log(chalk_1.default.yellow("⚠️  No files found."));
        return;
    }
    const baseUrl = options.base || (await (0, getGitBaseUrl_1.getGitBaseUrl)(dirPath));
    if (!baseUrl) {
        console.log(chalk_1.default.red("❌ Could not determine base URL. Use --base."));
        return;
    }
    const links = files.map((file) => `${baseUrl}/${encodeURI(file)}`);
    const outputPath = options.out ||
        (format === "mdx"
            ? path_1.default.join(dirPath, "docs", "generated-links.mdx")
            : undefined);
    await (0, writeOutput_1.writeOutput)({
        links,
        files,
        format,
        outputPath,
        dirPath,
        showTree: options.tree,
    });
}
