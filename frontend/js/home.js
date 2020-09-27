const url = "https://www.menzcouli.io/";

let shortestPathData = {
    name: "shortest-path-app",
    link: "https://shortestpathapp.herokuapp.com/",
    img: "/assets/shortestpaths.png",
    title: "<h3>Shortest Path App</h3>",
    paragraph: `<p>This is an app that visualizes path finding algorithms. Users can log in, create an account, or sign in as a guest user. Authenticated users can save, edit, delete, and rename maps, and all users can create maps and run any of the pathfinding algorithms on them. This app was created with react, node.js, graphql, and google firebase.</p>`,
    button: `<button class="btn btn-sm btn-outline-secondary" data-href="https://github.com/burhancoulibaly/shortest_path" onclick="window.open(this.getAttribute('data-href')); return false;">github</button>`
}
let gameOfLifeData = {
    name: "game-of-life-app",
    link: "https://the-game-of-life-app.herokuapp.com/",
    img: "/assets/gameoflife.png",
    title: "<h3>Game Of Life App</h3>",
    paragraph: `<p>This app visualizes Conway's Game of Life, users can draw active nodes onto a grid or randomnly generate them, and view the algorithm run on screen. Different settings can be set using the menu options for the app. This app was created using angular, and node.js</p>`,
    button: `<button class="btn btn-sm btn-outline-secondary" data-href="https://github.com/burhancoulibaly/game-of-life" onclick="window.open(this.getAttribute('data-href')); return false;">github</button>`
}
let mosiacP5Data = {
    name: "mosaic-p5",
    link: "https://mosaic-p5-demo.herokuapp.com/",
    img: "/assets/canvas.png",
    title: "<h3>Mosaic p5</h3>",
    paragraph: `<p>This project takes an image input by a user, and set of images used to make a mosaic image using the first image the user put in the app. It was created using javascript, the google cloud platform api, and p5js. The link above is to a demo of the app hosted on heroku. below are links to the github main and demo branch.</p>`,
    button: `<button class="btn btn-sm btn-outline-secondary" data-href="https://github.com/burhancoulibaly/mosaic-p5-revised" onclick="window.open(this.getAttribute('data-href')); return false;">github: main</button> <button class="btn btn-sm btn-outline-secondary" data-href="https://github.com/burhancoulibaly/mosaic-p5-revised/tree/mosaic-p5-demo" onclick="window.open(this.getAttribute('data-href')); return false;">github: demo</button>`
}
let chatAppData = {
    name: "chat-app",
    link: "https://chat-app-socketio-mc.herokuapp.com/",
    img: "/assets/chat-app.png>",
    title: "<h3>Chat App</h3>",
    paragraph: `<p>This project emulates a chat room. When a user enters, they input the username they'd like use and are then put in a chat room. When the user writes something in the chat it shows their name and the message they sent, and a list on the right hand side populates with users in the room. To view the code for this project click the github link below.</p>`,
    button: `<button class="btn btn-sm btn-outline-secondary" data-href="https://github.com/burhancoulibaly/chat-app" onclick="window.open(this.getAttribute('data-href')); return false;">github</button>`
}
let mockTransactionApp = {
    name: "mock-transaction-app",
    link: "https://youtu.be/HT42SA38hCg",
    img: "/assets/mock-transaction-app.png",
    title: "<h3>Mock Transaction App</h3>",
    paragraph: `<p>This project is my mock transaction app, it allows users to make transaction which are posted on the front page, and on their accoutpage. This app uses Angular for the frontend, Nodejs for the backend, graphql, and mysql for the database storage and calls, and jwt auth token, and refresh tokens for authentication.</p>`,
    button: `<button class="btn btn-sm btn-outline-secondary" data-href="https://github.com/burhancoulibaly/mock-transaction-app" onclick="window.open(this.getAttribute('data-href')); return false;">github</button>`

}

// When the user clicks the button, open the modal 
$("#projects .project-img").on("click", function(event) {
    let projectData = null;

    $(".modal-content").html("");

    if($(event.target)[0].attributes.alt.value.includes("mosiac-p5")){
        projectData = mosiacP5Data;
    }else if($(event.target)[0].attributes.alt.value.includes("chat-app")){
        projectData = chatAppData;
    }else if($(event.target)[0].attributes.alt.value.includes("mock-transaction-app")){
        projectData = mockTransactionApp;
    }else if($(event.target)[0].attributes.alt.value.includes("shortest-path-app")){
        projectData = shortestPathData;
    }else if($(event.target)[0].attributes.alt.value.includes("game-of-life-app")){
        projectData = gameOfLifeData;
    }

    $(document.body).addClass("modal-open");
    $(".modal").addClass("show");


    $(".modal-content").append(
        `<div class="close-btn-ctr"><span class="close">&times;</span></div>
        <div class="${projectData.name}">
            <a class="project-link" data-href=${projectData.link} onclick="window.open(this.getAttribute('data-href')); return false;">
            <div class="project-img">
                <img src=${projectData.img} alt="${projectData.name} project">
                <h3>View Site</h3>
            </div>
            </a>
            
            <div class="project-info">
                ${projectData.title}
                ${projectData.paragraph}
                <div class="buttons">
                    ${projectData.button}
                </div>
            </div>
        </div>
        `
    )

})

// When the user clicks anywhere outside of the modal or on the close button, close it
$(window).on("click", function(event) {
    // console.log($(event.target)[0].className);
    if ($(event.target)[0].className == "modal hide show" || $(event.target)[0].className == "close") {
        $(document.body).removeClass("modal-open");
        $(".modal").removeClass("show");
        $(".modal-content").html("");
    }
})

async function sendEmail(e){
    // this will prevent form and reload page on submit.
    e.preventDefault();

    let emailObj = new Object();

    //Getting form
    let form = e.srcElement.form;

    //Getting form data
    emailObj["name"] = form.querySelector("input#name").value;
    emailObj["email"] = form.querySelector("input#email").value;
    emailObj["subject"] = form.querySelector("input#subject").value;
    emailObj["message"] = form.querySelector("textarea#message").value;

    try{
        await sendEmailReq(emailObj);
    }catch(error){
        console.log(error);
    }
    

    $(form).css("display","none");
    $(".message-sent").css("display","block");
}

//Sending email
function sendEmailReq(emailObj){
    return new Promise((resolve, reject) =>{
        const path = "send-email"
        $.ajax({
            url: url+path,
            type: 'POST',
            data: JSON.stringify({
                email: emailObj
            }),
            contentType: "application/json; charset=utf-8",
            success: function(data){
                resolve("Success");
            },
            error: function(error){
                reject(`Error: `, error);
            }
        })
    })
}

