#!/usr/bin/env node
import meow from "meow";
import { build } from "esbuild";
import { execa } from "execa";

const cli = meow(
	`
	Usage
	  $ build.js [options]

	Options
	  --watch, -w  Watch files

	Examples
	  $ build.js --watch
`,
	{
		importMeta: import.meta,
		flags: {
			watch: {
				type: "boolean",
				alias: "w",
			},
		},
	}
);

const watch = cli.flags.watch;

let abortController = null;

const start = () => {
	const abortController = new AbortController();
	const subprocess = execa("pnpm", ["start"], {
		signal: abortController.signal,
	});
	subprocess.stdout.pipe(process.stdout);
	subprocess.catch((err) => {
		if (!err.isCanceled) {
			console.error(err.stderr);
			console.log("Waiting for file changes...");
		}
	});

	return abortController;
};

await build({
	entryPoints: ["src/index.ts"],
	outfile: "bin/index.js",
	bundle: true,
	sourcemap: true,
	platform: "node",
	format: "esm",
	external: ["./node_modules/*"],
	watch: watch
		? {
				async onRebuild(error, result) {
					if (abortController) {
						abortController.abort();
					}

					if (error) {
						console.error("watch build failed:", error);
					} else {
						console.log("Files changed, restarting...");
						abortController = start();
					}
				},
		  }
		: false,
});

if (watch) {
	console.log("Build script is watching files...");
	abortController = start();
} else {
	console.log("Build completed successfully.");
}
