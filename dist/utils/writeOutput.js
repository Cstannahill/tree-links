"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeOutput = writeOutput;
// src/utils/writeOutput.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const treeify_1 = __importDefault(require("treeify"));
function buildTree(files) {
    const tree = {};
    for (const file of files) {
        const parts = file.split("/");
        let current = tree;
        for (const part of parts) {
            current[part] = current[part] || {};
            current = current[part];
        }
    }
    return tree;
}
async function writeOutput({ links, files, format, outputPath, dirPath, showTree, }) {
    let output = "";
    if (showTree) {
        const tree = buildTree(files);
        console.log(chalk_1.default.cyan("\n📂 File Tree:\n"));
        console.log(treeify_1.default.asTree(tree, true, true));
    }
    switch (format) {
        case "txt":
            output = links.join("\n");
            break;
        case "md":
            output = links.map((link, i) => `- [${files[i]}](${link})`).join("\n");
            break;
        case "mdx":
            output = `export const Links = () => <>${"\n"}${links
                .map((link, i) => `- [${files[i]}](${link})`)
                .join("\n")}${"\n"}</>;`;
            break;
        case "json":
            output = JSON.stringify(files.map((f, i) => ({ name: f, url: links[i] })), null, 2);
            break;
        default:
            output = links.join("\n");
    }
    if (outputPath) {
        const fullPath = path_1.default.resolve(outputPath);
        fs_1.default.mkdirSync(path_1.default.dirname(fullPath), { recursive: true });
        fs_1.default.writeFileSync(fullPath, output, "utf-8");
        console.log(chalk_1.default.green(`\n✅ Output saved to: ${fullPath}`));
    }
    else {
        console.log(chalk_1.default.blue("\n🔗 Generated Links:\n"));
        console.log(output);
    }
}
