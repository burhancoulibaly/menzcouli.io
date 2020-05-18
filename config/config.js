try {
    global.client_id = require("./client_id.json");
} catch (error) {
    console.log("config.json doesnt exit using environment variables");
    global.client_id = {
        web: {
            client_id: new Buffer.from(process.env.CLIENT_ID, 'base64').toString("ascii").replace(/\\n/g, '\n'),
            client_secret: new Buffer.from(process.env.CLIENT_SECRET, 'base64').toString("ascii").replace(/\\n/g, '\n')
        }
    }
}

