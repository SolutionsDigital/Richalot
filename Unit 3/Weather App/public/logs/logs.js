// initiate the map in the <div> created to that effect
// note that this does not display a map.
// Tiles need to be loaded to display a map
// "L" is the leaflet object

const mymap = L.map('checkInMap').setView([0, 0], 1);

// Tiles will be taken from OpenStreet Map.
// Give credit where credit is due
const attribution =  '&copy; <a href="https://https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors';

// tile url as per format required by Leaflet
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

// create the tiles
// attribution needs to be passed as an object
const tiles = L.tileLayer(tileUrl, { attribution });

// add the tiles to the map
tiles.addTo(mymap);

getData();
// fetch asynchronously from /api. Default is GET Method
async function getData(){
    const response = await fetch('/api');
    const data = await response.json();
    console.log("TCL: getData -> data", data)

    

    // // display data onto page
    // // iterate through the response
    for (item of data){
        // add markers to the map
        const marker = L.marker([item.lat, item.lon]).addTo(mymap);
        // every pop up displays the weather
        let txt = `The weather here at latitude ${item.lat}&deg; and longitude ${item.lon}&deg; 
        is ${item.weather.summary} with a temperature of ${item.weather.temperature}&deg; Celcius. <br>`
        // if the air quality has a negative reading (i.e. there was no reading. See sketch.js try/catch/error)
        if (item.air.value < 0) {
        // build the text to go in the popup
        txt += 'No air quality data available.'
        // bind the popup to the marker passing the txt
        } else {
        // build the text to go in the popup
        txt += `The concentration of particle matter (${item.air.parameter}) is ${item.air.value} ${item.air.unit}
        last read on ${item.air.lastUpdated}.`
        }
        // bind the popup to the marker passing the txt
        marker.bindPopup(txt);
    };
    // console.log(data);   
};
