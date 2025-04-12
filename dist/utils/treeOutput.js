"use strict";
// import { FileEntry } from "./walkDir";
// export const renderTree = (
//   entries: FileEntry[],
//   prefix: string = "",
//   isLast: boolean = true
// ): string => {
//   return entries
//     .map((entry, index) => {
//       const isLastEntry = index === entries.length - 1;
//       const pointer = isLastEntry ? "└── " : "├── ";
//       const newPrefix = prefix + (isLastEntry ? "    " : "│   ");
//       if (entry.isDirectory) {
//         return (
//           `${prefix}${pointer}${entry.name}/\n` +
//           renderTree(entry.children || [], newPrefix, isLastEntry)
//         );
//       } else {
//         return `${prefix}${pointer}${entry.name}`;
//       }
//     })
//     .join("\n");
// };
