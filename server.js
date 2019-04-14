const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const fs = require("fs-extra");
const ekwGenerator = require("./ekwGenerator/index");

app.use(express.static(path.join(__dirname, "build")));

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(bodyParser.json());

// @todo find out why it returns too soon; clue: file not found before ekw.zip found in zip-handler
// @me: this seems to work now properly
app.post("/ekw-submit", async function(req, res) {
    let fileFound = false;
    console.log("request: ", req.body);
    const pathZip = path.join(__dirname, "tmp", "ekw.zip");
    await ekwGenerator(req.body.ekwName, req.body.description);
    setInterval(() => {
        if (fileFound === false) {
            fs.access(pathZip, fs.F_OK, err => {
                if (err) {
                    console.log("server: file not found");
                } else {
                    console.log("server: file found");
                    fileFound = true;
                    res.end();
                }
            });
        }
    }, 150);
    // @todo Kill setInterval after file has been found
});

app.get("/success", async function(req, res) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    console.log("inside success");
    await res.download(
        path.join(__dirname, "tmp", "ekw.zip"),
        "ekw.zip",
        err => {
            if (err) {
                console.log("Error at download", err);
                return res.status(404).end();
            } else {
                console.log("file download");
                return res.end();
            }
        }
    );
    // delete file after download + 5sek
    await setTimeout(function() {
        console.log("delete file");
        fs.remove(path.join(__dirname, "tmp", "ekw.zip"));
    }, 5000);
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080);
