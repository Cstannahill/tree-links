"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walkDir = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Recursively walks a directory and returns a *flat* list of file + directory entries.
 * Directories are included in the array (marked isDirectory=true).
 * If you only want files, just filter out `isDirectory`.
 *
 * @param dir The directory to scan
 * @param depth Optional maximum recursion depth (0 = current dir only, undefined = unlimited)
 * @param basePath Internal use for tracking relative pathing (defaults to dir)
 */
const walkDir = (dir, depth, basePath = dir) => {
    const entries = [];
    // Normalize depth
    if (depth === 0 || depth === "0")
        depth = 999; // fallback to large
    const maxDepth = typeof depth === "string" ? parseInt(depth) : depth;
    // console.log(`🔍 Scanning: ${dir} (depth: ${maxDepth ?? "∞"})`);
    let files = [];
    try {
        files = fs_1.default.readdirSync(dir);
    }
    catch (err) {
        console.error(`❌ Failed to read directory: ${dir}`, err);
        return entries; // empty array
    }
    for (const file of files) {
        // Skip unneeded folders/files
        if (file === "node_modules" ||
            file.startsWith(".") ||
            file === "dist" ||
            file === "package.json" ||
            file === "package-lock.json") {
            continue;
        }
        const fullPath = path_1.default.join(dir, file);
        let stat;
        try {
            stat = fs_1.default.statSync(fullPath);
        }
        catch (err) {
            console.warn(`⚠️ Failed to stat: ${fullPath}`, err);
            continue;
        }
        const relativePath = path_1.default
            .relative(basePath, fullPath)
            .split(path_1.default.sep)
            .join("/");
        if (stat.isDirectory()) {
            // console.log(`📁 Directory: ${relativePath}`);
            // Always push the directory entry so you can see it if you want
            entries.push({
                name: file,
                path: relativePath,
                isDirectory: true,
            });
            // Recurse deeper only if allowed by maxDepth
            if (maxDepth === undefined || maxDepth > 0) {
                console.log(`↪️  Recursing into ${relativePath} (remaining depth: ${maxDepth !== undefined ? maxDepth - 1 : "∞"})`);
                const childEntries = (0, exports.walkDir)(fullPath, maxDepth !== undefined ? maxDepth - 1 : undefined, basePath);
                // ✅ Flatten child entries into our main array
                entries.push(...childEntries);
            }
        }
        else {
            // console.log(`📄 File: ${relativePath}`);
            entries.push({
                name: file,
                path: relativePath,
                isDirectory: false,
            });
        }
    }
    return entries;
};
exports.walkDir = walkDir;
