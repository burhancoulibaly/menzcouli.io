global.client_id = getClientId();

function getClientId(){
    if(require("./client_id.json") && require("./client_id.json") != null){
        console.log("config.json exist");
        console.log(require("./client_id.json"));
        return require("./client_id.json");
    }else{
        console.log("config.json doesnt exit using environment variables");
        config = {
            web: {
                client_id: new Buffer.from(process.env.CLIENT_ID, 'base64').toString("ascii").replace(/\\n/g, '\n'),
                client_secret: new Buffer.from(process.env.CLIENT_SECRET, 'base64').toString("ascii").replace(/\\n/g, '\n')
            }
        }
        return config;
    }
}

