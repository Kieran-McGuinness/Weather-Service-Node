const https = require("https");
const http = require("http");
const url = require("url");
const appid = "19cec238330c6885fe0f80e1a9598138"; //API key goes here
const port = 3000;

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query; //parses req url for lat and lon variables

  res.end(
    "Welcome, please enter a latitude and longitude in the following format http://localhost:3000/weather.js?lat=40&lon=90 weather will output in the terminal" //response displaying instructions in browser window
  );

  const options = {
    //api information
    hostname: "api.openweathermap.org",
    path: `/data/3.0/onecall?lat=${queryObject.lat}&lon=${queryObject.lon}&exclude=minutely,hourly,daily&units=imperial&appid=${appid}`,
    method: "GET",
  };

  const call = https.request(options, (res) => {
    //calls the API with the options
    let data = "";
    res.on("data", (chunk) => {
      //combines data as it is received
      data += chunk;
    });
    res.on("end", () => {
      const locationData = JSON.parse(data); //converts received data from JSON
      if (locationData.cod === "400") {
        //checks if request was successful
        console.log(locationData);
      } else {
        //on successful request seperates out the desired data from the response
        const { temp, weather } = locationData.current;
        const { alerts } = locationData;
        let climate = "";

        if (temp >= 80) {
          climate = "Hot";
        } else if (temp <= 55) {
          climate = "Cold";
        } else {
          climate = "Moderate";
        }

        const display = {
          //combines the desired data
          condition: weather[0].main,
          climate: climate,
          alerts: alerts
            ? [{ event: alerts[0].event, description: alerts[0].description }]
            : [
                {
                  event: "No alerts in this area",
                  description: "No alerts to describe",
                },
              ],
        };

        console.log(display); //logs the desired data
      }
    });
  });
  call.on("error", (error) => {
    //error logger
    console.error(error);
  });
  call.end(); //ends request
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
  console.log(
    "Welcome, please enter a latitude and longitude in the following format http://localhost:3000/weather.js?lat=40&lon=90 weather will output in the terminal" //displays instructions in terminal
  );
});
