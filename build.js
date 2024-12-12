const { typecheckPlugin } = require("@jgoz/esbuild-plugin-typecheck");
const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const config = {
    entryPoints: ['./src/ts/index.ts'],
    outfile: './dist/index.js',
    bundle: true,
    format: 'esm',
    target: 'esnext',
    sourcemap: true,
    loader: {
        ".ts": "ts",
        ".css": "css",
        ".gif": "dataurl",
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

function copyFilesRecursively(sourceDir, destDir) {
    if (!fs.existsSync(sourceDir)) {
        console.error(`Source directory "${sourceDir}" does not exist.`);
        return;
    }

    // Ensure the destination directory exists
    fs.mkdirSync(destDir, { recursive: true });

    // Read all files and directories in the source directory
    const items = fs.readdirSync(sourceDir);

    items.forEach((item) => {
        const sourcePath = path.join(sourceDir, item);
        const destPath = path.join(destDir, item);

        if (fs.statSync(sourcePath).isDirectory()) {
            // If it's a directory, recursively copy its contents
            copyFilesRecursively(sourcePath, destPath);
        } else {
            // If it's a file, copy it to the destination
            fs.copyFileSync(sourcePath, destPath);
            console.log(`Copied: ${sourcePath} -> ${destPath}`);
        }
    });
}


// Example usage
const sourceFolder = path.resolve("src/ts/mxtypings");
const destinationFolder = path.resolve("dist/ts/mxtypings");

copyFilesRecursively(sourceFolder, destinationFolder);
console.log("Copying complete!");

// append text to top of a file

const prependText = (filePath, text) => {
    console.log(`Prepending ${text} to ${filePath}`);
    const data = fs.readFileSync(filePath, 'utf8');
    const fd = fs.openSync(filePath
        , 'w+');
    const insert = Buffer.from(text +
        data);
    fs.writeSync(fd, insert, 0, insert.length, 0);
    fs.close(fd, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
}

prependText('./dist/ts/src/ts/index.d.ts', `/// <reference path="./mxtypings/index.d.ts" />\n`);