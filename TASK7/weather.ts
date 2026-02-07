type WeatherSuccess = {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        main: string;
    }[];
};

type WeatherError = {
    message: string;
};

const apiKey: string = "27f0c9b8464fa45d1e1e3e2e19e82f62";

const button = document.getElementById("getWeatherBtn") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;
const cityInput = document.getElementById("cityInput") as HTMLInputElement;

button.addEventListener("click", () => {
    const city: string = cityInput.value;

    if (city === "") {
        resultDiv.innerText = "Please enter a city to get weather details";
        return;
    }

    fetchWeather(city);
});

function fetchWeather(city: string): void {
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=metric";

    fetch(url)
        .then(res => res.json())
        .then((data: WeatherSuccess | WeatherError) => {
            if ("message" in data) {
                resultDiv.innerText = "Invalid city name";
            } else {
                showWeather(data);
            }
        })
        .catch(() => {
            resultDiv.innerText = "Network error. Try again later.";
        });
}

function showWeather(data: WeatherSuccess): void {
    resultDiv.innerHTML =
        "City: " + data.name + "<br>" +
        "Temperature: " + data.main.temp + " °C<br>" +
        "Humidity: " + data.main.humidity + "%<br>" +
        "Condition: " + data.weather[0].main;
}
