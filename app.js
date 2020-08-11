window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimeZone = document.querySelector(".locationtimezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
        
            const api = `http://api.weatherapi.com/v1/current.json?key=ec60dbcb7bf54f05b5b181629202706&q=${lat},${long}`;
            //const proxy = `https://cors-anywhere.herokuapp.com/`
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    
                    temperatureDegree.textContent = data.current.feelslike_c; 
                    temperatureDescription.textContent = data.current.condition.text;
                    locationTimeZone.textContent = data.location.name;
                    iconLocation = data.current.condition.icon;
                    set_icon(iconLocation);
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === 'C'){
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = data.current.feelslike_f;
                        }
                        else{
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = data.current.feelslike_c;
                        }
                    });

                })    
        
        });
    }

    function set_icon(iconLocation){
        var newImage = new Image();
        newImage.src = iconLocation;
        newImage.onload = function(){fill_canvas(newImage)};
    };

    function fill_canvas(img){
        var canvas = document.getElementById('icon');
        var context = canvas.getContext('2d');
        img.height = 128;
        img.width = 128;
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img,0,0);
    }
});