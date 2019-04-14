// Own Requirements
const handleEkwName = require("./handler/handleEkwName");
const makeOtherCase = require("./handler/makeOtherCase");
const makeDirectoriesAndFiles = require("./handler/makeDirectoriesAndFiles");
const replaceStrings = require("./handler/replaceStrings");
const generateZip = require("./handler/generateZip");
const deletePrevFiles = require("./handler/deletePrevFiles");

// function with default-values if no values were provided
async function ekwGenerator(
    ekwName = "ekw",
    description = "",
    author = "tb",
    link = "https://codepen.io/BieniekThomas/"
) {
    try {
        var fixedEkwName = handleEkwName.handleEkwName(ekwName);
        var fixedEkwFileName = makeOtherCase.makeOtherCase(ekwName);
        await deletePrevFiles();
        await makeDirectoriesAndFiles(fixedEkwName, fixedEkwFileName);
        await replaceStrings(fixedEkwName, description);
        await generateZip();
    } catch (err) {
        return console.log("something went wrong", err);
    }
}

module.exports = ekwGenerator;
