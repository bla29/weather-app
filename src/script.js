import './stylesheet.css'
import './weather-icons.min.css'
import rainPhoto from './noCoverPhoto.png'
import cloudyPhoto from './noCoverPhoto2.png'
import sunPhoto from './yesCoverPhoto.png'

async function fetchWeatherData(location) {
    try {
        let weatherData = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + location + '?key=JSNMCU5XRFK5K7GTN8XCUBAZ6')
        return weatherData;
    }
    catch {
        console.log('Failed to fetch weather data!');
    }
}

function parseWeatherData(weatherData) {
    return new Promise((resolve, reject) => {
        if (weatherData) {
            weatherData.json().then((data) => {
                resolve(data);
            })
        } else {
            reject('Failed to parse weather object into JSON!')
        }
    })
}

function createIcon(condition) {
    let icon = document.createElement('i');
    icon.classList.add('wi');

    switch (condition) {
        case 'partly-cloudy-day':
            icon.classList.add('wi-day-cloudy');
            break;
        case 'rain':
            icon.classList.add('wi-rain-wind');
            break;
        case 'clear-day':
            icon.classList.add('wi-day-sunny');
            break;
        case 'snow':
            icon.classList.add('wi-day-snow');
            break;
        case 'cloudy':
            icon.classList.add('wi-cloudy');
            break;
        default:
            icon.classList.add('wi-cloud');
    }
    icon.classList.add('weather-icon');
    return icon;
}

function createNailong(condition) {
    let nailong = document.createElement('img');
    switch (condition) {
        case 'partly-cloudy-day':
            nailong.src = cloudyPhoto;
            break;
        case 'rain':
            nailong.src = rainPhoto;
            break;
        case 'clear-day':
            nailong.src = sunPhoto;
            break;
        case 'snow':
            nailong.src = rainPhoto;
            break;
        case 'cloudy':
            nailong.src = cloudyPhoto;
            break;
        default:
            nailong.src = sunPhoto;
    }
    nailong.classList.add('nailong');
    return nailong;
}

let formButton = document.querySelector('#submit-button');
let formField = document.querySelector('#location');

let forecastContainer = document.createElement('div');
forecastContainer.classList.add('forecast-container');

formButton.addEventListener('click', () => {
    let location = String(formField.value);
    forecastContainer.innerHTML = '';
    fetchWeatherData(location).then((data) => {
        parseWeatherData(data).then((parsedData) => {
            for (let day of parsedData.days) {
                console.log(day)
                let forecastIcon = createIcon(day.icon);
                let nailong = createNailong(day.icon);

                let forecastDay = document.createElement('div');

                let date = document.createElement('h2');
                date.textContent = 'Date: ' + day.datetime;

                let tempMax = document.createElement('h4');
                tempMax.textContent = 'High: ' + day.tempmax;

                let tempMin = document.createElement('h4');
                tempMin.textContent = 'Low: ' + day.tempmin;

                let temp = document.createElement('h4');
                temp.textContent = 'Current Temperature: ' + day.temp;

                forecastDay.appendChild(date);
                forecastDay.appendChild(tempMax);
                forecastDay.appendChild(tempMin);
                forecastDay.appendChild(temp);

                let forecastItem = document.createElement('div');
                forecastItem.classList.add('forecast-item');

                forecastItem.appendChild(forecastIcon);
                forecastItem.appendChild(nailong);
                forecastItem.appendChild(forecastDay);
                forecastContainer.appendChild(forecastItem);
            }
            document.body.appendChild(forecastContainer);
        })
    })
})



