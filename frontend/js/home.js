const url = "http://www.menzcouli.io/";

let mosiacP5Data = {
    name: "mosaic-p5",
    link: "https://mosaic-p5-demo.herokuapp.com/",
    img: "/assets/canvas.png",
    title: "<h3>Mosaic p5</h3>",
    paragraph: `<p>This project takes an image input by a user, and set of images used to make a mosaic image using the first image the user put in the app. It was created using javascript, the google cloud platform api, and p5js. The above below is to a demo of the app hosted on heroku. below are links to the github main and demo brach.</p>`,
    button: `<button class="btn btn-sm btn-outline-secondary" data-href="https://github.com/burhancoulibaly/mosaic-p5-revised" onclick="window.open(this.getAttribute('data-href')); return false;">github: main</button> <button class="btn btn-sm btn-outline-secondary" data-href="https://github.com/burhancoulibaly/mosaic-p5-revised/tree/mosaic-p5-demo" onclick="window.open(this.getAttribute('data-href')); return false;">github: demo</button>`
}
let chatAppData = {
    name: "chat-app",
    link: "https://chat-app-socketio-mc.herokuapp.com/",
    img: "/assets/chat-app.png>",
    title: "<h3>Chat App</h3>",
    paragraph: `<p>This project emulates a chat room, when a user enters they input the username they'd like, then the put in a chat room. When the user writes something in the chat it shows their name and the message they sent, and a list on the right hand side populates with users in the room. To view the code for this project click the github below.</p>`,
    button: `<button class="btn btn-sm btn-outline-secondary" data-href="https://github.com/burhancoulibaly/chat-app" onclick="window.open(this.getAttribute('data-href')); return false;">github</button>`
}
let snakeGameData = {
    name: "snake-game",
    link: "https://snake-game-mc.herokuapp.com/",
    img: "/assets/snake-game.png",
    title: "<h3>Snake Game</h3>",
    paragraph: `<p>This project is a snake game similar to the ones that would be found on old flip phones, that I created using javascript, and p5js (a clienct side library for creating graphics). The projects keeps track of the snakes location, its length whether or not its touching one of the four walls or the food it eats, using arrays and x and coordinates.</p>`,
    button: `<button class="btn btn-sm btn-outline-secondary" data-href="https://github.com/burhancoulibaly/Snake-Game" onclick="window.open(this.getAttribute('data-href')); return false;">github</button>`

}

// When the user clicks the button, open the modal 
$("#projects .project-img").on("click", function(event) {
    let projectData = null;

    $(".modal-content").html("");

    if($(event.target)[0].attributes.alt.value.includes("mosiac-p5")){
        projectData = mosiacP5Data;
    }else if($(event.target)[0].attributes.alt.value.includes("chat-app")){
        projectData = chatAppData;
    }else if($(event.target)[0].attributes.alt.value.includes("snake-game")){
        projectData = snakeGameData;
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
                reject(`Error: ${error}`);
            }
        })
    })
}

