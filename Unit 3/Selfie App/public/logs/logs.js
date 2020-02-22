getData();
// fetch asynchronously from /api. Default is GET Method
async function getData(){
    const response = await fetch('/api');
    const data = await response.json();

    // display data onto page
    // 1. Create the DOM elements on the page
    // 2. Instantiate elements
    // iterate through the response
    for (item of data){
        const root = document.createElement('p');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');

        // beware of quotation marks below 
        // ` is different from '
        mood.textContent = `mood: ${item.mood }`;
        geo.textContent = `${item.lat}°,${item.lon}°`;
        // converet timestamp to local readable date
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = '/images/'+item.filename;
        image.alt = 'image uploaded by user';

        // append to document
        root.append(mood, geo, date, image);
        document.body.append(root);
    };
    console.log(data);
     
};
