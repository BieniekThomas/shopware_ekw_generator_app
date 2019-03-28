const appRoot = require("app-root-path");
const fs = require("fs");

function readAndWrite(inputPath, outputName, correctEkwName, outputPath) {
    process.chdir(appRoot.toString());
    var data = fs.readFileSync("./ekwGenerator/" + inputPath);
    process.chdir("./_Shopware_Plugins/" + correctEkwName + outputPath);
    fs.writeFileSync(outputName, data.toString());
}

module.exports = readAndWrite;
