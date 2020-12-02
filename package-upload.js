#!/usr/bin/env node

const fs = require("fs");
const { execSync } = require("child_process");

const { version, wgVersoin } = require("./package.json");

const name = "cordova-plugin-inappbrowser"
const packFileName = `${name}-${version}.tgz`;
const packFileUploadName = `${name}-${version}-${wgVersoin}.tgz`;
const bucketFilePath = `plugins/capacitor/${packFileUploadName}`;

if (fs.existsSync(packFileName)) {
    fs.unlinkSync(packFileName);
}

execSync("npm pack");

let uploadSuccess = false;
try {
    const result = execSync(
        `qshell fput --overwrite lms-mobile ${bucketFilePath} ${packFileName}`
    ).toString();

    console.log("🤞");
    console.info(result);
    uploadSuccess = result.toString().match(/Put file .* success!/gi);
} catch (err) {
    console.error(err)
}

if (uploadSuccess) {
    console.log("✌️");
    console.log(`https://mobile-download.tronclass.com.cn/${bucketFilePath}`)
}
