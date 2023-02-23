import React, { Component } from "react";
import axios from "axios";
import "./styles/app.scss";

class App extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    const API_URL = "https://restcountries.com/v3.1/all";
    axios
      .get(API_URL)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => console.log(error));
  }
  componentDidUpdate() {
    console.log(this.state.data);
  }
  renderCountries = () => {
    return this.state.data.map((country) => {
      const languages = country.languages || {};
      const formattedLanguages = Object.values(languages);
      const languagesOrLanguage =
        formattedLanguages.length > 1 ? "Languages" : "Language";
      return (
        <div key={country.name.official} className="card">
          <div>
            <img
              className="card__img"
              src={country.flags.png}
              alt={country.name.official}
            />
          </div>
          <div className="card__info">
            <h1>{country.name.official}</h1>
            <p>Capital: {country.capital}</p>
            <p>
              {languagesOrLanguage}: {formattedLanguages.join(", ")}
            </p>
            <p>Population: {country.population}</p>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="container">
        <header>
          <h1>Learn Sass</h1>
        </header>
        <main>
          <div>
            <p>There are {this.state.data.length} countries in the api</p>
            <div className="card__wrapper">{this.renderCountries()}</div>
          </div>
        </main>
        <footer>
          <span>2023 Leraning Sass</span>
        </footer>
      </div>
    );
  }
}

export default App;
