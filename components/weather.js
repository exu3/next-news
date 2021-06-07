import React, { Component } from "react";
import fetch from "isomorphic-unfetch";

const API_KEY = process.env.WEATHER_API_KEY;

class Weather extends Component {
  state = {
    currently: "loading",
    forecast: {},
  };

  componentDidMount() {
    const url = "api.openweathermap.org/data/2.5/weather";

    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetch(
        `${url}?units=imperial&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((forecast) => this.setState({ forecast, currently: "success" }))
        .catch(() => this.setState({ currently: "error" }));
    };

    const error = () => {
      alert("Unable to retrieve your location for weather");
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }
  render() {
    const { currently, forecast } = this.state;
    return (
      <div>
        {currently === "success" ? (
          <>
            <div className="stat">
              <p className="label">Currently</p>
              <p className="value">{forecast.currently.summary}</p>
            </div>
            <div className="stat">
              <p className="label">Temperature</p>
              <p className="value">{forecast.currently.temperature}º</p>
            </div>
            <p>
              <span className="label">Right now</span>
              {forecast.hourly.summary}
            </p>
            <p>
              <span className="label">This week</span>
              {forecast.daily.summary}
            </p>
          </>
        ) : currently === "error" ? (
          <p>There was an error :(</p>
        ) : (
          <p>Loading…</p>
        )}{" "}
      </div>
    );
  }
}

export default Weather;
