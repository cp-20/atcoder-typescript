import * as esbuild from "esbuild";

const targetBasePath = `${import.meta.dir ?? "."}/src`;
const distBasePath = `${import.meta.dir ?? "."}/dist`;

// ベースディレクトリからのパス（拡張子は除く）
const files = ["main"];

function entrypoints(files: string[], extension: "ts" | "mts" | "cts") {
  return files.map((v) => `${targetBasePath}/${v}.${extension}`);
}

const outFile = `${distBasePath}/main.cjs`;

await esbuild
  .build({
    entryPoints: entrypoints(files, "ts"),
    bundle: true,
    minify: true,
    platform: "node",
    format: "cjs",
    target: "esnext",
    outfile: outFile,
  })
  .then(async () => {
    const source = await Promise.all(
      entrypoints(files, "ts").map((p) => Bun.file(p).text()),
    );
    const sourceJoined = source
      .map((s, i) => {
        const filename = entrypoints(files, "ts")[i].replace(
          targetBasePath,
          "",
        );
        const commented = s
          .split("\n")
          .map((v) => `// ${v}`)
          .join("\n");
        return `// ----- ${filename} -----\n${commented}`;
      })
      .join("\n\n");
    const content = await Bun.file(outFile).text();
    await Bun.write(outFile, `${sourceJoined}\n\n${content}`);
  })
  .catch(console.error);
