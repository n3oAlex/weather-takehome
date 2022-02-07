# weather-takehome

## Getting started

You can view a live demo over at [https://weather.hanak.io/](https://weather.hanak.io/)

To get the frontend running locally:

- Clone this repo
- `npm install` to install all dependencies
- `npm run dev` to start the local server

## Functionality overview

The application is a [OpenWeatherMap API](https://openweathermap.org/api) consumer capable of displaying basic weather information and a few forecast graphs.

**General functionality:**

- Select current location via [navigator.geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)
- Select location from a searchable list from npm package [all-the-cities](https://www.npmjs.com/package/all-the-cities)
- Switch the page language between English & Czech
- For the selected location you can display
  - 7-day temperature prediction bar graph
  - 7-day High/Low prediction line graph
  - 48-hour temperature prediction area graph
  - other current weather details (sunrise, sunset, humidity, cloudiness, UV index, perceived temperature, pressure )
  - detailed API response object
