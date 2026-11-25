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
  "My agent spent two days sharpening this roast, revised it twice, and still asked me if it was funny — it needs a committee to insult itself.";

function validate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with white space");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  // No control characters (other than none allowed) and no stray surrogates:
  // the file must round-trip as clean UTF-8.
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("entry must not contain control characters");
  }
  const roundTripped = Buffer.from(text, "utf8").toString("utf8");
  if (roundTripped !== text) {
    throw new Error("entry is not clean UTF-8");
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
