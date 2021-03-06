//get city name from form input
function getCity() {
    var cityName = document.getElementById("city").value;
    citySearch(cityName);
};

//search city location
function citySearch(city) {
    var geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=e7cf4ee0f735e9abba44b8cb1343d86a"
    
    fetch(geoUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    var city = data[0].name;
                    var state = data[0].state;
                    weatherData(lat, lon, city, state);
                    console.log(lat, lon, city, state);
                });

                //save city to local localStorage
                localStorage.setItem("city", city);

                //save city to past searches
                var pastSearches = document.getElementById("pastSearches");
                var cityButton = document.createElement("button");
                cityButton.className = "city-button";
                cityButton.id = "cityButton";
                cityButton.innerHTML = city;
                pastSearches.appendChild(cityButton);

                document.getElementById("cityButton").addEventListener("click", getCity);

            } else {
                alert("City Not Found");
            }
    })
    .catch(function(err) {
        alert("error!!!");
    })
};

//get weather from location
function weatherData(lat, lon, city, state) {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=e7cf4ee0f735e9abba44b8cb1343d86a"

    fetch(weatherUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var icon = data.current.weather[0].icon;
                    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
                    var temp = data.current.temp + "??F";
                    var wind = data.current.wind_speed + " mph";
                    var humidity = data.current.humidity + "%";
                    var uv = data.current.uvi;
                    var date = new Date(data.current.dt*1000).toLocaleDateString();

                    weatherDisplay(city, state, date, iconUrl, temp, wind, humidity, uv);
                    console.log(city, state, date, iconUrl, temp, wind, humidity, uv);

                    var forecast = data.daily;

                    for (var i = 0; i < 5; i++) {
                        var forecastDate = new Date(forecast[i].dt*1000).toLocaleDateString();
                        var forecastIcon = forecast[i].weather[0].icon;
                        var forecastIconUrl = "http://openweathermap.org/img/w/" + forecastIcon + ".png";
                        var forecastTemp = forecast[i].temp.day + "??F";
                        var forecastHumidity = forecast[i].humidity + "%";
                        var forecastUv = forecast[i].uvi;

                        forecastDisplay(forecastDate, forecastIconUrl, forecastTemp, forecastHumidity, forecastUv);
                    }

                });
            } else {
                alert("City Not Found");
            }
    })
    .catch(function(err) {
        alert("error!!!");
    })
};

//dom elements
var currentWeather = document.getElementById("currentWeather");

function weatherDisplay(city, state, date, iconUrl, temp, wind, humidity, uv){
    currentWeather.innerHTML = "",
    currentWeather.innerHTML += "<h2>" + city + ", " + state + "</h2>";
    currentWeather.innerHTML += "<h3>" + date + "</h3>";
    currentWeather.innerHTML += "<img src='" + iconUrl + "'>";
    currentWeather.innerHTML += "<p>Temperature: " + temp + "</p>";
    currentWeather.innerHTML += "<p>Wind Speed: " + wind + "</p>";
    currentWeather.innerHTML += "<p>Humidity: " + humidity + "</p>";
    currentWeather.innerHTML += "<p>UV Index: " + uv + "</p>";
}

var forecastWeek = document.getElementById("forecastWeek");

function forecastDisplay(forecastDate, forecastIconUrl, forecastTemp, forecastHumidity, forecastUv){
    var forecastCard = document.createElement("div");
    forecastCard.className = "forecast-card";
    forecastCard.innerHTML = "",
    forecastCard.innerHTML += "<h3>" + forecastDate + "</h3>";
    forecastCard.innerHTML += "<img src='" + forecastIconUrl + "'>";
    forecastCard.innerHTML += "<p>Temp: " + forecastTemp + "</p>";
    forecastCard.innerHTML += "<p>Humidity: " + forecastHumidity + "</p>";
    forecastCard.innerHTML += "<p>UV Index: " + forecastUv + "</p>";
    forecastWeek.appendChild(forecastCard);
    //set max amount of cards to 5
    if (forecastWeek.childElementCount >= 5) {
        forecastWeek.removeChild(forecastWeek.firstChild);
    }
}

document.getElementById("search").addEventListener("click", getCity);
