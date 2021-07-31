window.addEventListener('load',()=>{
    let long;
    let lat;

    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    let temperatureSectionSpan = document.querySelector(".degree-section span");
    let locationIcon = document.querySelector('.weather-icon');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
          
            const api = `http://api.weatherapi.com/v1/current.json?key=84d3410cb2ba4b8596f80307212805&q=${lat},${long}`;
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const{temp_f,temp_c} = data.current;
                    const{text} = data.current.condition;
                    const icon = data.current.condition.icon;

                    //Set DOM elements from API
                    temperatureDegree.textContent = temp_f;
                    temperatureDescription.textContent = text;
                    locationTimezone.textContent = data.location.name;
                    locationIcon.innerHTML =`<img src="${icon}">`;
                    
                    temperatureSection.addEventListener('click',()=>{
                        if(temperatureSectionSpan.textContent == 'F')
                        {
                            temperatureDegree.textContent = temp_c;
                            temperatureSectionSpan.textContent = 'C';
                        }else{
                            temperatureDegree.textContent = temp_f;
                            temperatureSectionSpan.textContent = 'F';
                        }
                    })

                });
        });
    }else{
        h1.textContent = "not enabled";
    }
});