// src/utils/getGitBaseUrl.ts
import simpleGit from "simple-git";
import path from "path";

export async function getGitBaseUrl(startPath: string): Promise<string | null> {
  const git = simpleGit(startPath);

  try {
    const root = await git.revparse(["--show-toplevel"]);
    const remote = await git.remote(["get-url", "origin"]);
    const branch = (await git.revparse(["--abbrev-ref", "HEAD"])).trim();

    // Convert SSH to HTTPS
    let base = remote?.trim() || "";
    if (base.startsWith("git@")) {
      base = base.replace(":", "/").replace("git@", "https://");
    }

    base = base.replace(/\.git$/, ""); // remove .git suffix
    return `${base}/tree/${branch}`;
  } catch {
    return null;
  }
}
