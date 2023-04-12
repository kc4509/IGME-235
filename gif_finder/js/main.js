// 1
window.onload = (e) => {
    document.querySelector("#search").onclick = searchButtonClicked
};

// 2
let displayTerm = "";

let buildGiphyURL = (searchterm, limit) => {
    const baseURL = 'https://api.giphy.com/v1/gifs/search?';

    //don't ship ur API key to users
    const apiKey = '5PuWjWVnwpHUQPZK866vd7wQ2qeCeqg7';
    
    let url = baseURL;
    url += 'api_key=' + apiKey;

    let term = searchterm.trim().toLowerCase();
    term = encodeURIComponent(term);
    displayTerm = term;
    
    if (term.length === 0) return;

    url += '&q=' + term;

    url += '&limit=' + limit;

    return url;
};


function getData(url){
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;

    xhr.open("GET", url);
    xhr.send();
}

function dataLoaded(e){
    let xhr = e.target;

    console.log(xhr.responseText);

    let obj = JSON.parse(xhr.responseText);

    if(!obj.data || obj.data.length == 0){
        document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'<b>";
        return;
    }

    let results = obj.data;
    console.log("results.length = " + results.length);
    let bigString = "<p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";

    for (let i=0; i<results.length;i++){
        let result = results[i];

        let smallURL = result.images.fixed_width_small.url;
        if (!smallURL) smallURL = "images/no-image-found.png";

        let url = result.url;

        let line = `<div class= 'result'><img src='${smallURL}' title= '${result.id}' />`;
        line += `<span><a target= '_blank' href= '${url}'>View on Giphy</a></span>`;

        line += `<span><p> Rating: '${result.rating.toUpperCase()}' </p></span></div>`;



        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "<b>Success!</b>";
}

function dataError(e){
    console.log("An error occurred");
}


// 3
function searchButtonClicked(){
    console.log("searchButtonClicked() called");
    
    const searchterm = document.querySelector('#searchterm').value;
    const limit = document.querySelector('#limit').value;
    const url = buildGiphyURL(searchterm, limit);

    document.querySelector('#status').innerHTML = `
        <b>Searching for "${searchterm}"...<b>
    `

    console.log(url);
    //let url = buildGiphyURL("burrito cat", 7);
    //Make request to giphy servers
    getData(url);
}