//get city name from form input
function getCity() {
    var cityName = document.getElementById("city").value;
    citySearch(cityName);
    console.log(cityName);
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
                    weatherData(lat, lon, city);
                    console.log(lat, lon, city);
                });
            } else {
                alert("City Not Found");
            }
    })
    .catch(function(err) {
        alert("error!!!");
    })
};

//get weather from location
function weatherData(lat, lon) {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=e7cf4ee0f735e9abba44b8cb1343d86a"

    fetch(weatherUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var icon = data.weather[0].icon;
                    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
                    var temp = data.main.temp;
                    var desc = data.weather[0].description;
                    var wind = data.wind.speed + " mph";
                    var humidity = data.main.humidity + "%";

                    console.log(iconUrl, temp, desc, wind, humidity);
                });
            } else {
                alert("City Not Found");
            }
    })
    .catch(function(err) {
        alert("error!!!");
    })
};

document.getElementById("search").addEventListener("click", getCity);