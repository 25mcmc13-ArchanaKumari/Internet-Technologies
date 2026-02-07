var apiKey = "27f0c9b8464fa45d1e1e3e2e19e82f62";
var button = document.getElementById("getWeatherBtn");
var resultDiv = document.getElementById("result");
var cityInput = document.getElementById("cityInput");
button.addEventListener("click", function () {
    var city = cityInput.value;
    if (city === "") {
        resultDiv.innerText = "Please enter a city to get weather details";
        return;
    }
    fetchWeather(city);
});
function fetchWeather(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=metric";
    fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        if ("message" in data) {
            resultDiv.innerText = "Invalid city name";
        }
        else {
            showWeather(data);
        }
    })
        .catch(function () {
        resultDiv.innerText = "Network error. Try again later.";
    });
}
function showWeather(data) {
    resultDiv.innerHTML =
        "City: " + data.name + "<br>" +
            "Temperature: " + data.main.temp + " °C<br>" +
            "Humidity: " + data.main.humidity + "%<br>" +
            "Condition: " + data.weather[0].main;
}
