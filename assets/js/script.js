//get city from form input
function getCity() {
    var cityName = document.getElementById("city").value;
    citySearch(cityName);
    console.log(cityName);
};

//search city function
function citySearch(city) {
    var geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=e7cf4ee0f735e9abba44b8cb1343d86a"
    
    fetch(geoUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    
                    console.log(lon, lat, city);
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