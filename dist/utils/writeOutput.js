"use strict";
// src/utils/writeOutput.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeOutput = writeOutput;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const treeify_1 = __importDefault(require("treeify"));
function writeOutput({ fileLinks, outputDir, treeHeader = "# 📁 Project Structure & Links", showTree = true, }) {
    const outputPath = path_1.default.join(outputDir, "linktree.mdx");
    fs_1.default.mkdirSync(outputDir, { recursive: true });
    let treeText = "";
    if (showTree) {
        const tree = {};
        for (const { name } of fileLinks) {
            const parts = name.split("/");
            let current = tree;
            for (const part of parts) {
                current[part] = current[part] || {};
                current = current[part];
            }
        }
        treeText = treeify_1.default.asTree(tree, true, false);
    }
    const mdx = `${treeHeader}

## 🧱 File Tree

export const Tree = () => (
  <pre>{\`
${treeText.trim()}
\`}</pre>
);

<Tree />

---

## 🔗 Links

${fileLinks.map((f) => `- [${f.name}](${f.url})`).join("\n")}
`;
    fs_1.default.writeFileSync(outputPath, mdx, "utf-8");
    console.log(chalk_1.default.green(`\n✅ Output saved to: ${outputPath}`));
}
