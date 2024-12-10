const { typecheckPlugin } = require("@jgoz/esbuild-plugin-typecheck");
const esbuild = require("esbuild");

const config = {
    entryPoints: ['./src/index.ts'],
    outfile: './dist/index.js',
    bundle: true,
    format: 'esm',
    target: 'esnext',
    sourcemap: true,
    loader: { 
        ".ts": "ts",
        ".css": "css",
    },
    plugins: [{
        name: 'rebuild-notify',
        setup(build) {
            build.onEnd(result => {
                console.log(`build ended with ${result.errors.length} errors`);
                // HERE: somehow restart the server from here, e.g., by sending a signal that you trap and react to inside the server.
            })
        },
    },
    typecheckPlugin({
        watch: process.argv.includes('--watch')
    }),
    ],
};

// check if watch is provided as an argument

const run = async () => {
    const ctx = await esbuild.context(config);
    if (process.argv.includes('--watch')) {
        console.log('Watching code');
        await ctx.watch();
    } else {
        console.log('Building code');
        await ctx.rebuild();
        ctx.dispose();
    }
};

run();