import fs from "fs";
import path from "path";

export interface FileEntry {
  name: string;
  path: string;
  isDirectory: boolean;
}

/**
 * Recursively walks a directory and returns a *flat* list of file + directory entries.
 * Directories are included in the array (marked isDirectory=true).
 * If you only want files, just filter out `isDirectory`.
 *
 * @param dir The directory to scan
 * @param depth Optional maximum recursion depth (0 = current dir only, undefined = unlimited)
 * @param basePath Internal use for tracking relative pathing (defaults to dir)
 */
export const walkDir = (
  dir: string,
  depth?: number | string,
  basePath: string = dir
): FileEntry[] => {
  const entries: FileEntry[] = [];

  // Normalize depth
  if (depth === 0 || depth === "0") depth = 999; // fallback to large
  const maxDepth = typeof depth === "string" ? parseInt(depth) : depth;

  // console.log(`🔍 Scanning: ${dir} (depth: ${maxDepth ?? "∞"})`);

  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch (err) {
    console.error(`❌ Failed to read directory: ${dir}`, err);
    return entries; // empty array
  }

  for (const file of files) {
    // Skip unneeded folders/files
    if (
      file === "node_modules" ||
      file.startsWith(".") ||
      file === "dist" ||
      file === "package.json" ||
      file === "package-lock.json" ||
      file === "migrations"
    ) {
      continue;
    }

    const fullPath = path.join(dir, file);
    let stat: fs.Stats;
    try {
      stat = fs.statSync(fullPath);
    } catch (err) {
      console.warn(`⚠️ Failed to stat: ${fullPath}`, err);
      continue;
    }

    const relativePath = path
      .relative(basePath, fullPath)
      .split(path.sep)
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
        console.log(
          `↪️  Recursing into ${relativePath} (remaining depth: ${
            maxDepth !== undefined ? maxDepth - 1 : "∞"
          })`
        );
        const childEntries = walkDir(
          fullPath,
          maxDepth !== undefined ? maxDepth - 1 : undefined,
          basePath
        );

        // ✅ Flatten child entries into our main array
        entries.push(...childEntries);
      }
    } else {
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
