"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDefaultCommand = handleDefaultCommand;
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const walkDir_1 = require("../utils/walkDir");
const getGitBaseUrl_1 = require("../utils/getGitBaseUrl");
const writeOutput_1 = require("../utils/writeOutput");
async function handleDefaultCommand(directory = "") {
    const scanPath = path_1.default.resolve(directory || ".");
    const projectRoot = path_1.default.resolve("src");
    const outputDir = path_1.default.join(projectRoot, "docs", "linktree");
    console.log(chalk_1.default.gray(`📁 Scanning: ${scanPath}`));
    const entries = (0, walkDir_1.walkDir)(scanPath, undefined, projectRoot);
    const files = entries.filter((e) => !e.isDirectory);
    if (files.length === 0) {
        console.log(chalk_1.default.yellow("⚠️  No files found."));
        return;
    }
    const baseUrl = await (0, getGitBaseUrl_1.getGitBaseUrl)(scanPath);
    if (!baseUrl) {
        console.log(chalk_1.default.red("❌ Could not determine base URL. Use --base."));
        return;
    }
    const fileLinks = files.map((f) => ({
        name: f.path.replace(/\\/g, "/"),
        url: `${baseUrl}/${encodeURI(f.path.replace(/\\/g, "/"))}`,
    }));
    (0, writeOutput_1.writeOutput)({ fileLinks, outputDir });
}
