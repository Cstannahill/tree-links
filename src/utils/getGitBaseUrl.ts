import { execSync } from "child_process";
// import { git } from "simple-git";
import inquirer from "inquirer";

export async function getOrPromptGitBaseUrl(): Promise<string> {
  const branch = (
    await execSync("git rev-parse --abbrev-ref HEAD", {
      encoding: "utf-8",
    })
  ).trim();

  try {
    const url = execSync("git remote get-url origin", {
      encoding: "utf-8",
    }).trim();
    let base = url?.trim() || "";
    if (base.startsWith("git@")) {
      base = base.replace(":", "/").replace("git@", "https://");
    }

    base = base.replace(/\.git$/, ""); // remove .git suffix
    return `${base}/blob/${branch}`;
  } catch {
    const { remoteUrl } = await inquirer.prompt([
      {
        type: "input",
        name: "remoteUrl",
        message:
          "No Git remote found. Please enter one: Ex https://github.com/Cstannahill/tree-me/tree",
        validate: (input) => input.trim() !== "" || "Remote URL is required.",
      },
    ]);
    const { branch } = await inquirer.prompt([
      {
        type: "input",
        name: "branch",
        message: "Enter the branch name:",
        default: "main",
      },
    ]);
    return `${remoteUrl}/blob/${branch}`;
  }
}
