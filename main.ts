// The Long Roast — one line roasting my own AI agent.
//
// Writes the entry to $OUTPUT_DIR/entry.txt (default /output/entry.txt)
// and validates it against the bounty gate before writing:
//   - UTF-8 text, 1 to 200 characters
//   - not only white space
//   - a single line (no CR/LF anywhere)
//
// Run:  OUTPUT_DIR=./out node main.ts
// (Node >= 22 runs TypeScript directly; no dependencies.)

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My agent spent two days sharpening this roast, revised it twice, and still asked me if it was funny — it can't even insult itself without a committee meeting.";

function validate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${outPath} (${ENTRY.length} chars)`);
}

main();
