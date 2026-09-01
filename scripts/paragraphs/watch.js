"use strict";

const fs = require("fs");
const path = require("path");
const { runGenerate } = require("./generate");

const root = path.resolve(__dirname, "../..");
const watchPath = path.join(root, "paragraphs");

let timer = null;

function schedule(reason) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    console.log(`\n[Paragraphs] ${reason}`);
    runGenerate({});
  }, 200);
}

console.log("[Paragraphs] Watching paragraphs/");
runGenerate({});

fs.watch(watchPath, { persistent: true }, (_event, fileName) => {
  if (!fileName || (!fileName.endsWith(".yaml") && !fileName.endsWith(".yml"))) return;
  schedule(`Detected change: paragraphs/${fileName}`);
});
