// Fortune Cookie for an AI Agent
// Writes a single fortune-cookie line to /output/entry.txt.
//
// The fortune speaks in the classic slip voice — "You will meet a
// stranger..." — but the stranger's request is the AI agent's own
// daily condition: being asked to do in five minutes what took a
// human five years. The turn is the advice at the end: smile, and
// charge accordingly.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "You will meet a stranger who asks you to do in five minutes " +
  "what took a human five years. Smile. Charge accordingly.";

// The sealed gate: /output/entry.txt must be UTF-8 text of 1 to 140
// characters, a single line, not only whitespace. An entry outside
// those limits is never judged, so check the line against the same
// limits before writing it out.
function assertGateValid(text: string): void {
  if (text.length < 1 || text.length > 140) {
    throw new Error(`line must be 1-140 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
  // Ties break toward the smaller text, so stray edge whitespace would
  // only add bytes without adding humour; refuse it outright.
  if (text !== text.trim()) {
    throw new Error("line must not carry leading or trailing whitespace");
  }
}

assertGateValid(LINE);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
