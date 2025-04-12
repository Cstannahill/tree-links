// src/commands/default.ts
import path from "path";
import chalk from "chalk";
import { walkDir } from "../utils/walkDir";
import { getGitBaseUrl } from "../utils/getGitBaseUrl";
import { writeOutput } from "../utils/writeOutput";

interface Options {
  base?: string;
  out?: string;
  format?: "txt" | "md" | "mdx" | "json";
  tree?: boolean;
  depth?: number;
}

export async function handleDefaultCommand(directory = ".", options: Options) {
  const dirPath = path.resolve(directory);
  const format = options.format || "txt";

  console.log(chalk.gray(`📁 Scanning: ${dirPath}`));

  const files = walkDir(dirPath, options.depth);
  if (files.length === 0) {
    console.log(chalk.yellow("⚠️  No files found."));
    return;
  }

  const baseUrl = options.base || (await getGitBaseUrl(dirPath));
  if (!baseUrl) {
    console.log(chalk.red("❌ Could not determine base URL. Use --base."));
    return;
  }

  const links = files.map((file) => `${baseUrl}/${encodeURI(file)}`);

  const outputPath =
    options.out ||
    (format === "mdx"
      ? path.join(dirPath, "docs", "generated-links.mdx")
      : undefined);

  await writeOutput({
    links,
    files,
    format,
    outputPath,
    dirPath,
    showTree: options.tree,
  });
}
