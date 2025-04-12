import fs from "fs";
import path from "path";
import chalk from "chalk";
import { walkDir } from "../utils/walkDir";
import { getGitBaseUrl } from "../utils/getGitBaseUrl";
import { writeOutput } from "../utils/writeOutput";

export async function handleDefaultCommand(directory = "") {
  const scanPath = path.resolve(directory || ".");
  const projectRoot = path.resolve("src");
  const outputDir = path.join(projectRoot, "docs", "linktree");

  console.log(chalk.gray(`📁 Scanning: ${scanPath}`));

  const entries = walkDir(scanPath, undefined, projectRoot);
  const files = entries.filter((e) => !e.isDirectory);
  if (files.length === 0) {
    console.log(chalk.yellow("⚠️  No files found."));
    return;
  }

  const baseUrl = await getGitBaseUrl(scanPath);
  if (!baseUrl) {
    console.log(chalk.red("❌ Could not determine base URL. Use --base."));
    return;
  }

  const fileLinks = files.map((f) => ({
    name: f.path.replace(/\\/g, "/"),
    url: `${baseUrl}/${encodeURI(f.path.replace(/\\/g, "/"))}`,
  }));

  writeOutput({ fileLinks, outputDir });
}
