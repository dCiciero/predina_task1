var access_token = "pk.eyJ1Ijoib2djaWNlcm8iLCJhIjoiY2prazk2bDFlMTloeDN2cGs0OWdnZ3M3dCJ9.TjHJEC7jposIe4SV254wJA"
var map = L.map('map').setView([51.496842,-0.16882], 13);

L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${access_token}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.light',
    accessToken: `${access_token}`
}).addTo(map);
let latlng = [], display = [], coordinates = [];
let recordToLoad = 0;
let maxRecord = 50000;
let signal;

function loadCoord() {
    d3.csv("data/Coordinates.csv", (d) => {
        while (recordToLoad < maxRecord) {
            let values = Object.values(d)
            latlng[0] = parseFloat(values[0]);
            latlng[1] = parseFloat(values[1]);
            display.push(values);
            displayCoord(latlng);
            recordToLoad = Math.round(Math.random() * maxRecord);
            break;
        }
        
    });
}

function getRandCoord(){

}
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
        fillOpacity: 0.02,
        radius: 30
    }).addTo(map); 
}

loadCoord();

setInterval(()=>{
    display.forEach(e => {
        displayCoord(e);
    });
}, 1000)
