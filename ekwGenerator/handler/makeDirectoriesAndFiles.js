const readAndWrite = require("./readAndWrite");
const fs = require("fs");
const appRoot = require("app-root-path");

function makeDirectoriesAndFiles(correctEkwName, correctFileName) {
    process.chdir(appRoot.toString());

    // Create Directories
    fs.mkdirSync("_Shopware_Plugins/" + correctEkwName, { recursive: true });
    process.chdir("_Shopware_Plugins/" + correctEkwName);

    // Generate FolderStructure Synchronously
    fs.mkdirSync("ComponentHandler/");
    fs.mkdirSync(
        "Resources/views/emotion_components/widgets/emotion/components/",
        { recursive: true }
    );
    fs.mkdirSync("Resources/views/frontend/_public/src/less/", {
        recursive: true
    });
    fs.mkdirSync("Subscriber/");

    process.chdir(appRoot.toString());
    const srcRoot = "/shopware_ekw_basic_source-master";

    // write Files
    readAndWrite(
        srcRoot + "/plugin_php.txt",
        correctFileName + ".php",
        correctEkwName,
        "/"
    );
    readAndWrite(
        srcRoot + "/plugin_xml.txt",
        correctFileName + ".xml",
        correctEkwName,
        "/"
    );
    readAndWrite(
        srcRoot + "/componenthandler_pluginHandler_php.txt",
        "pluginHandler.php",
        correctEkwName,
        "/ComponentHandler"
    );
    readAndWrite(
        srcRoot + "/resources_services_xml.txt",
        "services.xml",
        correctEkwName,
        "/Resources"
    );
    readAndWrite(
        srcRoot +
            "/resources_views_emotion_components_widgets_emotion_components_plugin_adv_tpl.txt",
        correctFileName + ".tpl",
        correctEkwName,
        "/Resources/views/emotion_components/widgets/emotion/components"
    );
    readAndWrite(
        srcRoot + "/resources_views_frontend_public_src_less_all_less.txt",
        "all.less",
        correctEkwName,
        "/Resources/views/frontend/_public/src/less/"
    );
    readAndWrite(
        srcRoot + "/subscriber_emotion_php.txt",
        "Emotion.php",
        correctEkwName,
        "/Subscriber"
    );
}

module.exports = makeDirectoriesAndFiles;
