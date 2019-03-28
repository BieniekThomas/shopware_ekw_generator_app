const appRoot = require("app-root-path");
const zipFolder = require("zip-a-folder");
const fs = require("fs-extra");

// @todo: rausfinden warum es manchmal nicht funktioniert
async function generateZip() {
    console.log("inside generator Zip");
    const root = appRoot.toString();

    const pathPlugin = root + "/_Shopware_Plugins/";
    const pathZip = root + "/tmp/ekw.zip";

    // recursive Funktion als Fallback falls es beim ersten mal nicht funktioniert
    let i = 0;
    async function zipEkwFolder() {
        await zipFolder.zipFolder(pathPlugin, pathZip, err => {
            if (err) {
                console.log("Something went wrong!", err);
            } else {
                fs.access(pathZip, fs.F_OK, err => {
                    if (err) {
                        console.log("ekw.zip not found");
                        i++;
                        i < 3
                            ? zipEkwFolder()
                            : console.log("zip not possible");
                    } else {
                        console.log("ekw.zip found");

                        // remove Folder when zip is generated
                        fs.removeSync("_Shopware_Plugins");

                        return;
                    }
                });
            }
        });
    }

    try {
        await zipEkwFolder();
    } catch {
        return console.log("zip not possible");
    }
}

module.exports = generateZip;
