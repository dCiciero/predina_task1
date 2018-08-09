var access_token = "pk.eyJ1Ijoib2djaWNlcm8iLCJhIjoiY2prazk2bDFlMTloeDN2cGs0OWdnZ3M3dCJ9.TjHJEC7jposIe4SV254wJA"
var map = L.map('map').setView([51.496842,-0.16882], 13);

L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${access_token}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.light',
    accessToken: `${access_token}`
}).addTo(map);
let coordinates = [];
let signal;

// loadCoord(10);

setInterval(() => {
    loadCoord(10);
},1000)

function heatCode() {
    var code = Math.round(Math.random() * 10) + 1;
     return code > 7 ? '#ff0000':
            code > 5 ? '#ffff00':
            code > 3 ? '#ffff00':
                       '#008000';
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

function loadCoord(numberOfCordinates) {
    d3.csv("data/Coordinates.csv", function (data) {
        while (numberOfCordinates > 0) {
            let entry = Object.values(data);
            coordinates[0] = parseFloat(entry[0]);
            coordinates[1] = parseFloat(entry[1]); 
            displayCoord(coordinates);               
            numberOfCordinates--;
            break;
        };
    });
}
