# tree-links

A minimal, TypeScript-powered CLI tool that recursively walks a directory tree, generates relative file paths, and builds sharable GitHub-style links for every file. Perfect for documenting, linking, or sharing the structure of your projects.

---

## 🚀 Features

- 📁 Walks entire folder trees (recursively)
- 🔗 Outputs GitHub-style URLs for each file
- 🧭 Uses a base GitHub path to generate full links
- 🧠 Auto-detects local Git remote URL if `baseUrl` is omitted
- 📦 Outputs `.txt`, Markdown, or JSON
- 🌲 Optional pretty-printed tree view
- 🧑‍💻 Simple CLI interface, ready for automation or docs

---

## 📦 Installation

```bash
npm install -g tree-links
```

---

## 💻 Usage

```bash
tree-links [directory] [baseUrl]
```

If no `baseUrl` is provided, it will auto-detect the Git remote and infer a GitHub-compatible link.

### 🔧 Example

```bash
tree-links ./src https://github.com/yourname/your-repo/tree/main/src
```

Or just:

```bash
tree-links ./src
```

_(uses git origin URL as base)_

---

## 📄 CLI Options

| Flag             | Description                               |
| ---------------- | ----------------------------------------- |
| `--format <fmt>` | Output format: `txt`, `md`, or `json`     |
| `--tree`         | Show a visual tree structure              |
| `--out <file>`   | Save output to a file                     |
| `--depth <n>`    | Limit folder traversal to `n` levels deep |
| `--base <url>`   | Override auto-detected Git base URL       |

---

## 🏗️ npm Publishing-Ready Structure

Tree-links is structured for clean TypeScript CLI builds:

```
tree-links/
├── src/
│   └── index.ts        # Entry point CLI script
├── dist/               # Compiled JS output
├── package.json        # bin entry and metadata
├── tsconfig.json       # Strict, CLI-friendly TS config
├── README.md
```

To build and test locally:

```bash
npm install
npm run build
npm link
```

Then you can run it anywhere:

```bash
tree-links ./src
```

To publish:

```bash
npm login
npm publish --access public
```

---

## 💡 Naming Ideas

If you want something more clever:

- `linkwood` – building links from trees
- `gh-tree-links` – clearer GitHub intent
- `branchlink` – plays on git trees + links
- `trex` – short, fun, “tree explorer”

Let me know if you want to rebrand it — I’ll refactor all CLI references + docs too.

---

## 🧠 Future Enhancements

- Toggle between GitHub / GitLab / Bitbucket link templates
- Include folders as clickable links
- Export as markdown w/ tree + links
- VSCode extension / GUI launcher
- Interactive prompt for missing args

---

## 📝 License

MIT

---

Built with ❤️ by Christian Tannahill
