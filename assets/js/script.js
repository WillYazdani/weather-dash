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
                    weatherData(lat, lon, city);
                    console.log(lat, lon, city, state);
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
    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=e7cf4ee0f735e9abba44b8cb1343d86a"

    fetch(weatherUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var icon = data.current.weather[0].icon;
                    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
                    var temp = data.current.temp + "°F";
                    var wind = data.wind_speed + " mph";
                    var humidity = data.current.humidity + "%";
                    var uv = data.current.uvi;
                    var date = new Date(data.current.dt*1000).toLocaleDateString();

                    //weatherDisplay(iconUrl, temp, wind, humidity, date);
                    console.log(date, iconUrl, temp, wind, humidity, uv);

                    localStorage.setItem("city", city);
                });
            } else {
                alert("City Not Found");
            }
    })
    .catch(function(err) {
        alert("error!!!");
    })
};

//function weatherDisplay(){}



document.getElementById("search").addEventListener("click", getCity);