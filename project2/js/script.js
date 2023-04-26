//onload 
window.onload = (e) => {
    document.querySelector("#button").onclick = searchButtonClicked
};

let displayTerm = "";

//functions
let buildURL = (longitude, latitude, days) => {
    const baseURL = 'https://api.open-meteo.com/v1/forecast?';

    let url = baseURL;

    let lat = parseFloat(latitude);
    lat = "latitude=" + lat;

    let long = parseFloat(longitude);
    long = "longitude=" + long;

    let day = days.trim();   
    day = "days=" + days;

    let term = lat + "&" + long;
    displayTerm = lat + " " + long;

    /*if (long.length||lat.length||days.length === 0) return;*/
    

    url += term + "&hourly=temperature_2m,precipitation&temperature_unit=fahrenheit&precipitation_unit=inch&forecast_" + day;

    return url;
}

function getData(url){
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;

    xhr.open("GET", url);
    xhr.send();
}


function dataLoaded(e){
    let xhr = e.target;

    let obj = JSON.parse(xhr.responseText);

    let temperatures = obj.hourly.temperature_2m;

    let hours = obj.hourly.time;

    let precipitation = obj.hourly.precipitation;

    let weathers = [];
    for (let i = 0; i < temperatures.length; i++) {
        const weatherInfo = {
            hour: new Date(hours[i]),
            temperature: temperatures[i],
            precipitation: precipitation[i]
        }
        weathers.push(weatherInfo)
    }


    if (weathers.length >= 1){
        document.querySelector('#info').innerHTML = "";
        for (let i = 0; i<weathers.length; i++){
            let text = String(weathers[i].hour);
            let time = text.slice(16, 24);
            let day = text.slice(0,15);
            if (i % 24 == 0){
                document.querySelector('#info').innerHTML += "<br>" + day;
            }
            document.querySelector('#info').innerHTML += "<br>" + time + " Temperature: " + weathers[i].temperature + " °F | Precipitation: " +weathers[i].precipitation; 
        }
    }

    // loop through weathers
    // for each one,
    // produce html
    // then add that to the dom

    if(!temperatures || temperatures.length == 0){
        document.querySelector("#info").innerHTML = "<b>No results found for '" + displayTerm + "'<b>";
        return;
    }

    console.log("results.length = " + temperatures.length);
    let bigString = "<p><i>Here are " + temperatures.length + " results for '" + displayTerm + "'</i></p>";


    document.querySelector("#status").innerHTML = "<b>Success!</b>";

   
}

function dataError(e){
    console.log("An error occurred");
}



function searchButtonClicked(){
    console.log("searchButtonClicked() called");

    const long = document.querySelector('#longitude').value;
    const lat = document.querySelector('#latitude').value;
    const day = document.querySelector('#days').value;

    const url = buildURL(long, lat, day);

    document.querySelector('#status').innerHTML = `
        <b>Searching for longitude ${long}, latitude ${lat}, for ${day} day(s)
    `
    console.log(url);
    getData(url);
    //window.scrollBy(0, 500);
}

