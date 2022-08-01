# Weather Service Node.js

## Description

An http server that takes in latitude/longitude coordinates and returns weather data from the Open Weather API for the given location. The weather data that is returned includes:

1. The current weather conditions outside in the area.
2. The temperature outside as either hot (80°F+), moderate(79°F-56°F), or cold (55°F-).
3. Any weather alerts in the area and their description.

## Technologies

Node.js

## Launch

Requires an Open Weather One Call API 3.0 key. The key must be added to the appid variable in the weather.js file. A key can be obtained here https://openweathermap.org/api

To run this project locally:

```
$node weather.js
```

The format for inputting the latitude and longitude coordinates is
- http://localhost:3000/weather.js?lat=LAT&lon=LON
  - Example: http://localhost:3000/weather.js?lat=40&lon=90
The weather response can be accessed by 
```
$ curl http://localhost:3000/weather.js?lat=40&lon=90
```
