// Post-build step: set <html lang="de"> on the exported German routes.
//
// The app uses a single root layout (required for `output: "export"`), so every
// page is pre-rendered with the root's `<html lang="en">`. This rewrites the
// lang attribute for everything under out/de/ so German pages ship the correct
// language to crawlers and assistive technology. Run automatically after
// `next build` (see package.json).

import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const DE_DIR = join(process.cwd(), "out", "de");
const LANG_ATTR = /(<html\b[^>]*\blang=)"en"/i;

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await htmlFiles(path)));
    } else if (entry.name.endsWith(".html")) {
      files.push(path);
    }
  }
  return files;
}

async function main() {
  if (!existsSync(DE_DIR)) {
    console.warn("[fix-lang] out/de not found — skipping (nothing to rewrite).");
    return;
  }

  const files = await htmlFiles(DE_DIR);
  let changed = 0;

  for (const file of files) {
    const html = await readFile(file, "utf8");
    if (LANG_ATTR.test(html)) {
      await writeFile(file, html.replace(LANG_ATTR, '$1"de"'), "utf8");
      changed += 1;
    }
  }

  console.log(`[fix-lang] set lang="de" on ${changed}/${files.length} German page(s).`);
}

main().catch((error) => {
  console.error("[fix-lang] failed:", error);
  process.exit(1);
});
