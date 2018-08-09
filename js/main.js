var access_token = "pk.eyJ1Ijoib2djaWNlcm8iLCJhIjoiY2prazk2bDFlMTloeDN2cGs0OWdnZ3M3dCJ9.TjHJEC7jposIe4SV254wJA"
var map = L.map('map', {
    center: [55.310151,-3.4483919999999997],
    preferCanvas: false,
    zoomControl: true,
    zoom: 13
}).setView([51.496842,-0.16882], 13);

L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${access_token}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: `${access_token}`
}).addTo(map);
let latlng = display = coordinates = [];
let recordToLoad = 0;
let signal;

function loadCoord() {
    console.time("totalTime:");
    d3.csv("data/Coordinates.csv")
        .on("progress", function(evt) {
            console.log("Amount loaded: " + evt.loaded)
        })
        .get(function(data) {
            coordinates = data;
        });
    
}

loadCoord();

setTimeout(() => {
    recordToLoad = 10;
    coordinates.forEach(element => {
        while (recordToLoad > 0) {
            latlng[0] = (parseFloat(element.Latitude));
            latlng[1] = (parseFloat(element.Longitude));
            displayCoord(latlng);
            recordToLoad--
            break;
        }
    });
    
}, 5000);



function heatCode() {
    var code = Math.round(Math.random() * 10) + 1;
     return code> 8 ? '#ff0000':
            code> 6 ? '#ff7802':
            code> 4 ? '#fff200':
                      '#027025';
}

function displayCoord(coordinates) {
    signal = heatCode();
    L.circle(coordinates, {
        stroke: false,
        fillColor: signal,
        fillOpacity: 0.8,
        radius: 300
    }).addTo(map); 
}

