const HOST = 'www.menzcouli.io';

const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      server = require('http').createServer(app),
      client_id = require("../config/config"),
      { google } = require("googleapis"),
      OAuth2 = google.auth.OAuth2,
      nodemailer = require("nodemailer");


//Google Auth
const oauth2Client = new OAuth2(
      global.client_id.web.client_id,
      global.client_id.web.client_secret,
      "https://developers.google.com/oauthplayground"
    );
  
oauth2Client.setCredentials({
  refresh_token: "1//04HgmTyYyqbkgCgYIARAAGAQSNwF-L9IrSaxdGm_Mg5Tv07TYe8AXup6lIUs3lQpCT8-9-vPCOSsBNnXlfkfZmlhcCMi7ilJsTF4"
});

const accessToken = oauth2Client.getAccessToken()

const html = path.resolve('./frontend/html'),
      css = path.resolve('./frontend/css'),
      js = path.resolve('./frontend/js'),
      bootstrap = path.resolve('./node_modules/bootstrap/dist'),
      jquery = path.resolve('./node_modules/jquery'),
      assets = path.resolve('./assets');

//Creating static files located on localhost
app.use('/html', express.static(html));
app.use('/css', express.static(css));
app.use('/js', express.static(js));
app.use('/bootstrap', express.static(bootstrap));
app.use('/jquery', express.static(jquery));
app.use('/assets', express.static(assets));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

let transporter = null;

server.listen(process.env.PORT || 3000);
// server.listen(process.env.PORT || 3000);
console.log(`Server running http://${process.env.HOST || HOST} on port: ${process.env.PORT || 3000}`);
// console.log(`Server running on port: ${process.env.PORT || 3000}`);

app.get('/', async function(req,res){
  console.log(oauth2Client);
  try {
    transporter = await getTransporter();
  }catch(error){
    console.log(`Error: ${error}`);
  }

  res.sendFile(html+'/home.html');
});

app.post('/send-email', async function(req,res){
  let myEmail = "burhancoulibaly@gmail.com";
  let emailObj = req.body.email;

  let mailOptions = {
    to: myEmail, // list of receiver
    subject: `("${emailObj.name}" <${emailObj.email}>) ${emailObj.subject}`,
    text: emailObj.message, // plain text body
  }

  console.log(mailOptions);

  try{
    let info = await transporter.sendMail(mailOptions);
    
    console.log(info);
    res.send(`Success`);
  }catch(error){
    console.log(error);
    res.send(`Error: ${error}`)
  }
})

async function getTransporter(){
  try{
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'burhancoulibaly@gmail.com',
            clientId: global.client_id.web.client_id,
            clientSecret: global.client_id.web.client_secret,
            refreshToken: "1//04HgmTyYyqbkgCgYIARAAGAQSNwF-L9IrSaxdGm_Mg5Tv07TYe8AXup6lIUs3lQpCT8-9-vPCOSsBNnXlfkfZmlhcCMi7ilJsTF4",
            accessToken: "ya29.a0Ae4lvC1_MUmBnOxqgay5HapdIXxX9Jz6EjOnKc1W-n4Ij8UZ8u_lx08agRR1i2VmgEsfKxZI9wd3jDSuUvDggwDiH46V5XCocp9M3p2hB_eH6FOXl9nBEar26LSnQ3RSz9KCyfpd8u4eYG8gtTcoFzY6OiiKVYI21rM"
        }
    });

    // verify connection configuration
    transporter.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    return transporter;
  }catch(error) {
    return error;
  }
}