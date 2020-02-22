        let lat, lon;
        // test if geolocation is available
        if ("geolocation" in navigator) {
            
            // geolocation is available
            console.log("geolocation available");
            navigator.geolocation.getCurrentPosition(async position => {
                let lat, lon, weather, air
                try{
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;
                        
                    document.getElementById("latitude").textContent = lat.toFixed(2);
                    document.getElementById("longitude").textContent = lon.toFixed(2);

                    const api_url = `weather/${lat},${lon}`;
                    const response = await fetch(api_url);
                    const json = await response.json();

                    weather = json.weather.currently;
                    air = json.air_quality.results[0].measurements[0];

                    // instantiate weather
                    document.getElementById('summary').textContent = weather.summary;
                    document.getElementById('temperature').textContent = weather.temperature;

                    // instantiate air quality
                    document.getElementById('aq_parameter').textContent = air.parameter;
                    document.getElementById('aq_value').textContent = air.value;
                    document.getElementById('aq_units').textContent = air.unit;
                    document.getElementById('aq_date').textContent = air.lastUpdated;

                } catch (error) {
                    console.log('something went wrong');
                    // The likely cause of error is no reading of air quality
                    // if there is no reading of air quality assign a value of -1 to the air property
                    // This is still recorded in the db
                    air = {value:-1};
                    document.getElementById('aq_parameter').textContent = "NO READING AVAILABLE";
                };
                const data = {lat,lon, weather, air};
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
                const db_response = await fetch('/api', options);
                const db_json = await db_response.json();
                console.log(db_json);

            });
            } else {
                // geolocation IS NOT available
                console.log("geolocation not available");
            };