let weather = {
    'apiKey': 'f2cddca6e23ebf9d4ee80ac79a607b4e',
    fetchWeather: function (city) {
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q='
            + city
            + '&units=imperial&appid='
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { temp, humidity } = data.main;
        const { icon, description } = data.weather[0];
        const { speed } = data.wind;
        //console.log(name, humidity, temp, icon, description, speed);
        document.querySelector('.city').innerText = "Weather in " + name;
        document.querySelector('.icon').src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerText = description;
        document.querySelector('.humidity').innerText = "Humidity: " + humidity + "%";
        document.querySelector('.wind').innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector('.temp').innerText = Math.floor(temp) + "°F";
        document.querySelector('.weather').classList.remove('loading');
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector('.search-button').addEventListener('click', function () {
    weather.search();
})

document.querySelector('.search-bar').addEventListener('keyup', function (e) {
    if (e.key === "Enter") {
        weather.search();
    }
})

weather.fetchWeather("New York");