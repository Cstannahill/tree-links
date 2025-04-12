// src/utils/writeOutput.ts
import fs from "fs";
import path from "path";
import chalk from "chalk";
import treeify from "treeify";

interface WriteOptions {
  links: string[];
  files: string[];
  format: "txt" | "md" | "mdx" | "json";
  outputPath?: string;
  dirPath: string;
  showTree?: boolean;
}

function buildTree(files: string[]): any {
  const tree: any = {};
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

export async function writeOutput({
  links,
  files,
  format,
  outputPath,
  dirPath,
  showTree,
}: WriteOptions) {
  let output: string = "";

  if (showTree) {
    const tree = buildTree(files);
    console.log(chalk.cyan("\n📂 File Tree:\n"));
    console.log(treeify.asTree(tree, true, true));
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
      output = JSON.stringify(
        files.map((f, i) => ({ name: f, url: links[i] })),
        null,
        2
      );
      break;
    default:
      output = links.join("\n");
  }

  if (outputPath) {
    const fullPath = path.resolve(outputPath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, output, "utf-8");
    console.log(chalk.green(`\n✅ Output saved to: ${fullPath}`));
  } else {
    console.log(chalk.blue("\n🔗 Generated Links:\n"));
    console.log(output);
  }
}
