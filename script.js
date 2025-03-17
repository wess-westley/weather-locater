const weatherform = document.querySelector('.weatherform');
const city = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const APIKEY= "be5b886af77847c064786b520b74c0e0";
weatherform.addEventListener('submit', async event => {
    event.preventDefault();
    if (city.value.trim()) {
        try {
            const weatherdata = await getweatherData(city.value.trim());
            displayweatherinfo(weatherdata);
        } catch (error) {
            console.error(error);
            displayerror(error.message);
        }
    } else {
        displayerror("Please enter a city");
    }
});

async function getweatherData(city) {
    const urlapi = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKEY}`;
    const response = await fetch(urlapi);
    if (!response.ok) {
        throw new Error("Could not fetch weather in the specified location");
    }
    return await response.json();
}

function displayweatherinfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const disk = document.createElement("p");
    const weatheremoji = document.createElement("p");

    citydisplay.textContent = city;
    citydisplay.classList.add("city");

    tempdisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    tempdisplay.classList.add("temperature");

    humiditydisplay.textContent = `Humidity: ${humidity}%`;
    humiditydisplay.classList.add("humidity");

    disk.textContent = description;
    disk.classList.add("disk");

    weatheremoji.textContent = getweatheremoji(id);
    weatheremoji.classList.add("weatheremoji");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(disk);
    card.appendChild(weatheremoji);
}

function getweatheremoji(weatherid) {
    switch (true) {
        case (weatherid >= 200 && weatherid <= 300):
            return '⛈';
        case (weatherid >= 300 && weatherid <= 400):
            return '🌧';
        case (weatherid >= 500 && weatherid <= 600):
            return '🌧';
        case (weatherid >= 600 && weatherid <= 700):
            return '❄';
        case (weatherid >= 700 && weatherid <= 800):
            return '🌪';
        case (weatherid === 800):
            return '☀';
        case (weatherid >= 801 && weatherid <= 810):
            return '🌫';
        default:
            return "?";
    }
}

function displayerror(message) {
    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("errordisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}
