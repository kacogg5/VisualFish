console.log(Bun.build);

Bun.build({
  entrypoints: ["./src/index.tsx"],
  outdir: "./build",
});