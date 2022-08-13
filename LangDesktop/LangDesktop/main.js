const { app, BrowserWindow } = require('electron')
const fs = require('fs-extra');
const http = require("http");
const request = require('request');
const axios = require('axios');

const unzip = require('unzip');

if (require('electron-squirrel-startup')) return app.quit();

var win = null

var offline = false;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        titleBarStyle: 'hidden',
    })

    win.loadFile('checkingupdates.html')
}

const startServer = () => {
    win.loadFile('startingserver.html')
    const host = '0.0.0.0';
    const port = 9362;
    
    const requestListener = function (req, res) {
        const appPath = app.getPath('userData');
        const langPath = appPath + '/Lang-main';
        const fileToRead = langPath + req.url;
        console.log(fileToRead);
        
        if (fileToRead.endsWith(".png")) {
            var s = fs.createReadStream(fileToRead);
            s.on('open', function () {
                res.setHeader('Content-Type', "image/png");
                res.writeHead(200);
                s.pipe(res);
            });
        } else if (fileToRead.endsWith(".jpg")) {
            var s = fs.createReadStream(fileToRead);
            s.on('open', function () {
                res.setHeader('Content-Type', "image/jpg");
                res.writeHead(200);
                s.pipe(res);
            });
        } else {
            fs.readFile(fileToRead, 'utf8', (err, data) => {
                // If the file doesn't exist, create it
                if (err) {
                    console.log(err);
                } else {
                    res.writeHead(200);
                    res.end(data);
                }
            }); 
        }    
    };
    
    const server = http.createServer(requestListener);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
    win.loadURL('http://0.0.0.0:9362/index.html')
}

const updateLang = () => {
    win.loadFile('updating.html')
    // Copy Lang from the github repo into the app
    // https://github.com/nwvbug/nwvbug/archive/refs/heads/main.zip
    console.log("Updating lang");

    // delete the old lang folder
    const appPath = app.getPath('userData');
    const langPath = appPath + '/lang';

    // Using rmSync delete the old lang folder
    try {
        fs.rmSync(langPath, { recursive: true });
    } catch (err) {
        console.error(err)
    }


    const url = 'https://github.com/nwvbug/Lang/archive/refs/heads/main.zip';
    const dest = appPath + '/lang.zip';
    var out = fs.createWriteStream(dest);

    var fileSize;

    var req = request({
        method: 'GET',
        uri: url
    });

    req.on('response', function ( data ) {
        console.log("Starting download");
        fileSize = data.headers['content-length'];
        console.log(fileSize)
    });
    
    req.pipe(out);
    
    req.on('data', function (chunk) {
        // console.log(chunk.length);
        // console.log(fileSize);
    });
    
    req.on('end', function() {
        console.log('File downloaded successfully');
        fs.createReadStream(appPath + '/lang.zip')
        .pipe(unzip.Extract({ path: appPath }))
        .on('close', () => {
            console.log('File unzipped successfully');
            fs.unlink(appPath + '/lang.zip', (err) => {
                if (err) throw err;
                console.log('File deleted successfully');
                startServer();
            });
        });
    });
}

const checkUpdateLang = () => {
    const appPath = app.getPath('userData');
    // Check if an update is needed
    
    var lastHash = "";

    fs.readFile(appPath + '/lang.txt', 'utf8', (err, data) => {
        // If the file doesn't exist, create it
        if (err) {
            fs.writeFile(appPath + '/lang.txt', 'en', (err) => {
                if (err) throw err;
                console.log('The file has been created at ' + appPath + '/lang.txt');
            });
            lastHash = "none";
        } else {
            lastHash = data;
        }
    });

    // Make a GET request to https://api.github.com/repos/nwvbug/nwvbug/commits/main
    // and get the latest commit hash
    axios.get('https://api.github.com/repos/nwvbug/lang/commits/main')
    .then(function (response) {
        // If the hash is different, update the file
        if (response.data.sha != lastHash) {
            fs.writeFile(appPath + '/lang.txt', response.data.sha, (err) => {
                if (err) throw err;
                console.log('The file has been updated!');
            });
            updateLang();
        } else {
            startServer();
        }
    })
}

app.whenReady().then(() => {
    // Check if the user has internet

    // var net = require('net');
    // var testSocket = new net.Socket();
    // testSocket.on('error', function (e) {
    //     if (e.code == 'ECONNREFUSED') {
    //         offline = true;
    //         win.loadFile('offline.html')
    //     }
    // });

    createWindow()
    checkUpdateLang();
})