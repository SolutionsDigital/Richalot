       // adding the P5.js name space (the setup() function)
       function setup(){
        noCanvas();
        // capture the default video camera
        const video = createCapture(VIDEO);
        video.size(320,240);

        document.getElementById('geolocate').addEventListener('click', event => {
        // test if geolocation is available
            if ("geolocation" in navigator) {
                // geolocation is available
                console.log("geolocation available");
                const mood = document.getElementById('mood').value;
                navigator.geolocation.getCurrentPosition(async position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                // load the pixels of the video onto a canvas
                video.loadPixels();
                // taking the video's canvas and converting it to base64
                const image64 = video.canvas.toDataURL();
                
                document.getElementById("latitude").textContent = lat;
                document.getElementById("longitude").textContent = lon;


                const data = {lat,lon,mood, image64};
                const options ={
                        // declare the method fetch() will use
                    method : 'POST',
                    headers: {
                        // use the headers to explicit to the server the format of the post   
                        'Content-Type': 'application/json'},
                        // prepare the data to be sent as a JSON encoded string
                    body: JSON.stringify(data)
                }; 
                // the callback function of getCurrentPosition has been made async
                // so the response from the server will not be handled too early
                // i.e. will only be handled when the fetch() is completed
                const response = await fetch('/api', options);
                const json = await response.json();
                console.log(json);
                });
            } else {
                // geolocation IS NOT available
                console.log("geolocation not available");
            }
        });
    }