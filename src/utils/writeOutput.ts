// src/utils/writeOutput.ts

import fs from "fs";
import path from "path";
import chalk from "chalk";
import treeify from "treeify";

interface FileLink {
  name: string;
  url: string;
}

export function writeOutput({
  fileLinks,
  outputDir,
  treeHeader = "# 📁 Project Structure & Links",
  showTree = true,
}: {
  fileLinks: FileLink[];
  outputDir: string;
  treeHeader?: string;
  showTree?: boolean;
}) {
  const outputPath = path.join(outputDir, "linktree.mdx");
  fs.mkdirSync(outputDir, { recursive: true });

  let treeText = "";

  if (showTree) {
    const tree = {} as Record<string, any>;
    for (const { name } of fileLinks) {
      const parts = name.split("/");
      let current = tree;
      for (const part of parts) {
        current[part] = current[part] || {};
        current = current[part];
      }
    }
    treeText = treeify.asTree(tree, true, false);
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

  fs.writeFileSync(outputPath, mdx, "utf-8");
  console.log(chalk.green(`\n✅ Output saved to: ${outputPath}`));
}
