import React, { useEffect, useState } from "react";
import CardActionArea from '@mui/material/CardActionArea';

import "./weather.css";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const Weather = () => {
  //eslint-disable-next-line
  const [parsedWeatherData, setParsedWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const weatherIcon = parsedWeatherData ? <WbSunnyIcon /> : null;

  useEffect(() => {
    // useEffect will ask the user to know its current location on page render and when allowed will show the weather of his/her location on the page.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherDataByCoords(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  }, []);

  const fetchCoordsByCity = async () => {
    // Fetching Coordinates of city i.e. longitude and latitude and using them later to get the weather of the city.
    const geoLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=2e10c98182ed4cd10e0b48369322f4f8`;
    const response = await fetch(geoLocationUrl);
    const geoData = await response.json();

    if (geoData.length > 0) {
      fetchWeatherDataByCoords(geoData[0].lat, geoData[0].lon);
    }
    setLocation(""); // Reset location input
  };

  const fetchWeatherDataByCoords = async (lat, lon) => {
    // Fetching the current weather data by longitude and latitude of the location
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=2e10c98182ed4cd10e0b48369322f4f8`;
    const response = await fetch(weatherUrl);
    const data = await response.json();
    if (data) {
      setParsedWeatherData(data);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchCoordsByCity();
    }
  };

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="background">

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Container sx={{ maxWidth: "100%", maxHeight: "100%", overflow: "auto" }}>
          <Card sx={{ opacity: 1.9, padding: "20px", mt: 3, maxHeight: "100%", overflow: "auto" }}>
            <CardContent sx={{ maxHeight: "500px" }}>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={location}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                InputProps={{ style: { color: "white", background: "black" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              {parsedWeatherData && parsedWeatherData.weather && (

                <Grid container spacing={2} sx={{ paddingTop: "20px", }}>
                  <Typography component="div">
                    <Box sx={{ lineHeight: "2", fontSize: "1rem" }}>
                      {" "}
                      {/* Added line height for better readability */}
                      <Grid item xs={12}>
                        <Card className="weatherCard">
                          <CardContent>
                            <Typography variant="h5" component="h2" className="weatherIcon">
                              {weatherIcon}
                              Weather in {parsedWeatherData.name}, {parsedWeatherData.sys.country}
                            </Typography>
                        
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card className="weatherCard">
                          <CardContent>
                            <Typography variant="h5" component="h2"  className="weatherIcon">
                              {weatherIcon}
                              Temperature: {parsedWeatherData.main.temp}°C
                              <br />
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card className="weatherCard">
                          <CardContent>
                            <Typography variant="h5" component="h2"  className="weatherIcon">
                              {weatherIcon}
                              Feels like: {parsedWeatherData.main.feels_like}°C
                              <br />
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card className="weatherCard">
                          <CardContent>
                            <Typography variant="h5" component="h2"  className="weatherIcon">
                              {weatherIcon}
                              Min Temp: {parsedWeatherData.main.temp_min}°C
                              <br />
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card className="weatherCard">
                          <CardContent>
                            <Typography variant="h5" component="h2"  className="weatherIcon">
                              {weatherIcon}
                              Humidity: {parsedWeatherData.main.humidity}%<br />
                            </Typography>
                          </CardContent>
                        </Card>

                      </Grid>
                      <Grid item xs={12}>
                        <Card className="weatherCard">
                          <CardContent>
                            <Typography variant="h5" component="h2"  className="weatherIcon">
                              {weatherIcon}
                              Wind Speed: {parsedWeatherData.wind.speed} m/s
                              <br />
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card className="weatherCard">
                          <CardContent>
                            <Typography variant="h5" component="h2"  className="weatherIcon">
                              {weatherIcon}
                              Visibility: {parsedWeatherData.visibility} meters
                              <br />
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card className="weatherCard">
                          <CardContent>
                            <Typography variant="h5" component="h2"  className="weatherIcon">
                              {weatherIcon}
                              Sunrise: {formatTime(parsedWeatherData.sys.sunrise)}
                              <br />
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card className="weatherCard">
                          <CardContent>
                            <Typography variant="h5" component="h2"  className="weatherIcon">
                              {weatherIcon}
                              Sunset: {formatTime(parsedWeatherData.sys.sunset)}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Box>
                  </Typography>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </div>
  );
};

export default Weather;
