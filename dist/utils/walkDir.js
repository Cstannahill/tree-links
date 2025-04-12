"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walkDir = walkDir;
// src/utils/walkDir.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function walkDir(currentPath, maxDepth = Infinity, depth = 0, basePath = currentPath, results = []) {
    if (depth > maxDepth)
        return results;
    const entries = fs_1.default.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
        const entryPath = path_1.default.join(currentPath, entry.name);
        const relPath = path_1.default.relative(basePath, entryPath).replace(/\\/g, "/");
        if (entry.isDirectory()) {
            walkDir(entryPath, maxDepth, depth + 1, basePath, results);
        }
        else {
            results.push(relPath);
        }
    }
    return results;
}
