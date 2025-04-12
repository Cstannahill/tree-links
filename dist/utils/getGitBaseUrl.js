"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitBaseUrl = getGitBaseUrl;
// src/utils/getGitBaseUrl.ts
const simple_git_1 = __importDefault(require("simple-git"));
async function getGitBaseUrl(startPath) {
    const git = (0, simple_git_1.default)(startPath);
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
    }
    catch {
        return null;
    }
}
