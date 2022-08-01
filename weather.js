const https = require("https");
const http = require("http");
const url = require("url");
const appid = "86d0c5171ea2b6a509e3b4558c52ec34";
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  res.end(
    "Welcome please enter a latitude and longitude in the following format http://localhost:3000/weather.js?lat=40&lon=90"
  );

  const options = {
    hostname: "api.openweathermap.org",
    path: `/data/3.0/onecall?lat=${queryObject.lat}&lon=${queryObject.lon}&exclude=minutely,hourly,daily&units=imperial&appid=${appid}`,
    method: "GET",
  };

  const call = https.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      const locationData = JSON.parse(data);
      if (locationData.cod === "400") {
        console.log(locationData);
      } else {
        const { temp, weather } = locationData.current;
        const { alerts } = locationData;
        let climate = "";

        if (temp >= 80) {
          climate = "hot";
        } else if (temp <= 55) {
          climate = "cold";
        } else {
          climate = "moderate";
        }

        const display = {
          condition: weather[0].main,
          climate: climate,
          alerts: alerts
            ? [{ event: alerts[0].event, description: alerts[0].description }]
            : [{ event: "no alerts in this area", description: "no alerts" }],
        };

        console.log(display);
      }
    });
  });
  call.on("error", (error) => {
    console.error(error);
  });
  call.end();
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
