//array to hold phrases
let phrases = ["Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.", "Computers make very fast, very accurate mistakes.", "How many programmers does it take to change a light bulb? None. It’s a hardware problem.", "It’s ok computer, I go to sleep after 20 minutes of inactivity too.", "Where did the IT guy go? He probably ransomeware.", "I changed my password to 'incorrect'. So whenever I forget what it is the computer will say 'Your password is incorrect'.", "My email password has been hacked. That's the third time I've had to rename the cat.", "I love the F5 key. It´s just so refreshing.", "I named my hard drive 'dat ass' so once a month my computer asks if I want to 'back dat ass up'.", "JavaScript is a lot like English; No one knows how to use semicolons properly.", "Why do JavaScripters wear glasses? Because they don't C#", "Why was the JavaScript developer sad? Because he didn't Node how to Express himself"];

//onLoad event
window.onload = function () {
    displayQuote();
    document.querySelector("#button").addEventListener("click", displayQuote);
}

//Add phrase onto webpage
console.log("This is working");


function displayQuote(){
    document.getElementById("box").innerHTML = phrases[Math.floor(Math.random()* phrases.length)];
}


