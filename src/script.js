import './stylesheet.css'

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

let formButton = document.querySelector('#submit-button');
let formField = document.querySelector('#location');

let forecastContainer = document.createElement('div');
forecastContainer.classList.add('forecast-container');

formButton.addEventListener('click', () => {
    let location = String(formField.value);
    fetchWeatherData(location).then((data) => {
        parseWeatherData(data).then((parsedData) => {
            console.log(parsedData)
            for (let day of parsedData.days) {
                let forecastDay = document.createElement('div');
                forecastDay.classList.add('forecast-item');

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

                forecastContainer.appendChild(forecastDay);
            }
            document.body.appendChild(forecastContainer);
        })
    })
})



