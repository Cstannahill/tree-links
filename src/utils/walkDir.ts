// src/utils/walkDir.ts
import fs from "fs";
import path from "path";

export function walkDir(
  currentPath: string,
  maxDepth: number = Infinity,
  depth: number = 0,
  basePath: string = currentPath,
  results: string[] = []
): string[] {
  if (depth > maxDepth) return results;

  const entries = fs.readdirSync(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(currentPath, entry.name);
    const relPath = path.relative(basePath, entryPath).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      walkDir(entryPath, maxDepth, depth + 1, basePath, results);
    } else {
      results.push(relPath);
    }
  }

  return results;
}
