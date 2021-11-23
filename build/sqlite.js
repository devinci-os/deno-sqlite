/// <reference types="./sqlite.d.ts" />

import env from "./vfs.js";

// Create wasm instance and seed random number generator
export default async function instantiate(url) {
  const module = await WebAssembly.compileStreaming(await fetch(url));
  const placeholder = { exports: null };
  const instance = WebAssembly.Instance(module, env(placeholder));
  placeholder.exports = instance.exports;
  instance.exports.seed_rng(Date.now());
  return instance;
}
