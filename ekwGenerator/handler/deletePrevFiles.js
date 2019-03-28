const fs = require("fs-extra");
// const appRoot = require('app-root-path');
const path = require("path");

function deletePrevFiles() {
    fs.removeSync("_Shopware_Plugins");
    fs.readdir("tmp", (err, files) => {
        if (err) return;

        for (const file of files) {
            fs.remove(path.join("tmp", file), err => {
                if (err) return console.log("could not delete files");
            });
        }
    });
}

module.exports = deletePrevFiles;
