// import fs from "fs";
import path from "path";
import chalk from "chalk";
import { walkDir } from "../utils/walkDir";
import { getOrPromptGitBaseUrl } from "../utils/getGitBaseUrl";
import { writeOutput, writeOutputMd } from "../utils/writeOutput";
import readline from "readline";

export async function handleDefaultCommand(directory = "") {
  const scanPath = path.resolve(directory || ".");
  const projectRoot = path.resolve(".");
  const outputDir = path.join(projectRoot, "Linktree");
  console.log(chalk.gray(`📁 Scanning: ${scanPath}`));

  const entries = walkDir(scanPath, undefined, projectRoot);
  const files = entries.filter((e) => !e.isDirectory);
  if (files.length === 0) {
    console.log(chalk.yellow("⚠️  No files found."));
    return;
  }
  console.log(chalk.yellowBright(`${scanPath}`));
  const baseUrl = await getOrPromptGitBaseUrl();
  if (!baseUrl) {
    const gitUrl = await prompt(
      `No Git remote found. Enter the github address for this project and branch to properly reference your repository files.\n ${chalk.cyanBright(
        "For example, my base git is https://github.com/Cstannahill tree-me is this project and my branch is main. If connected to a remote, this will be picked up automatically. If not I would manually enter https://github.com/Cstannahill/tree-me/tree/main"
      )}`
    );
    console.log(chalk.red("❌ Could not determine base URL. Use --base."));
    return;
  }

  const fileLinks = files.map((f) =>
    // console.log(chalk.bgCyanBright(f?.path)),
    // console.log(chalk.bgWhite(baseUrl)),
    ({
      name: f.path.replace(/\\/g, "/"),
      url: `${baseUrl}/${encodeURI(f.path.replace(/\\/g, "/"))}`,
    })
  );

  writeOutput({ fileLinks, outputDir });
  writeOutputMd({ fileLinks, outputDir });
}
