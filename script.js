let weatherContent = document.getElementById("weather");
let details1 = document.getElementById("details-1");
let weather_icon = document.getElementById("image");
let details2 = document.getElementById("details-2");
// let weatherLocation = document.querySelector(".location");
// let weatherDateAndTime = document.querySelector(".date-and-time");
// let currentSituation = document.querySelector(".current-situation");
// let weatherIcon =document.querySelector(".weather-icon");
// let currentTemperature = document.querySelector(".current-temperature");

let feelsLike = document.getElementById("temp");
let humidity = document.getElementById("hum");
let wind = document.getElementById("wi");
let currentPressure = document.getElementById("pre");


async function getWeather() {
    let searchCity = document.getElementById("search-place").value;
   try {
    const weatherApi = `https://api.weatherapi.com/v1/current.json?key=48070a9ad4cd4a92951171804251904&q=${searchCity}&aqi=no`;
    const result = await fetch(weatherApi, {
        headers: {
            Accept: "application/json"
        } 
    })

    const data = await result.json();
    console.log(data);
    feelsLike.innerHTML = `<p>${data.current.feelslike_c}&deg;C</p>`;
    humidity.innerText = await data.current.humidity + "%";
    wind.innerText = await data.current.wind_kph + "kmph";
    currentPressure.innerText = await data.current.pressure_mb + "mb";

    // weatherLocation.innerHTML = `<h2>${data.location.name}, ${data.location.country}</h2>`;
    // weatherDateAndTime.innerText = await data.location.localtime;
    // currentSituation.innerText = await data.current.condition.text;
    // weatherIcon.innerHTML = `<img src="${data.current.condition.icon}" alt="icon"></img>`;
    // currentTemperature.innerHTML = `<p>${data.current.temp_c}&deg;C</p>`;

        details1.innerHTML = `
            <h3><p><i class="fa-solid fa-location-dot"></i> &nbsp; </p>${data.location.name}, ${data.location.country}</h3>
            <p>${data.location.localtime}</p>
            <p id="presentContions">Condition: ${data.current.condition.text}</p>
            `;
        weather_icon.innerHTML = `<img src="${data.current.condition.icon}" alt="icon">`;
        details2.innerHTML = `<p>Temperature: ${data.current.temp_c}°C</p>`;



        //changing bg based on day time or night time
        let bgVideo = document.getElementById("bg-video");
        if(data.current.is_day !=0) {
            bgVideo.querySelector("source").src = "/Assets/clear morning sky.mp4";
        } else {
            bgVideo.querySelector("source").src = "/Assets/clear and night sky.mp4";
        }
        bgVideo.load();

        if(data.current.condition.text === "Sunny") {
            bgVideo.querySelector("source").src = "/Assets/sunny.mp4";
        }
        bgVideo.load();

        if(data.current.condition.text === "Rainy") {
            bgVideo.querySelector("source").src = "/Assets/sunny.mp4";
        }
        bgVideo.load();

        
        if(data.current.condition.text === "Partly cloudy") {
            bgVideo.querySelector("source").src = "/Assets/partly cloudy.mp4";
        }
        bgVideo.load();
   } catch(error) {
        if(error) {
            alert('Enter a valid city name!');
        }
   }; 

    searchCity.value = "";
}

document.getElementById("search-place").addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        getWeather();
    };

});

