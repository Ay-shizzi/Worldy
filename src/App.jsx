import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const CountryInformationApp = () => {
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAllCountries, setShowAllCountries] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [isDarkMode, setDarkMode] = useState(false);

  const fetchCountryData = async () => {
    setLoading(true);
    setError(null);
    setShowAllCountries(false);
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/name/${country}`
      );
      setCountryData(response.data);
    } catch (error) {
      console.error("Error fetching country data:", error);
      setError("Error fetching country data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCountries = async () => {
    setLoading(true);
    setError(null);
    setCountryData(null);
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      const countries = response.data;
      setAllCountries(countries);
      setShowAllCountries(true);
    } catch (error) {
      console.error("Error fetching all countries data:", error);
      setError("Error fetching all countries data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <div>
      <nav className="navbar">
        <h1 className="logo">Worldy</h1>
        <label class="toggle-btn">
          <input
            type="checkbox"
            role="switch"
            className="grow theme-toggler"
            onChange={toggleDarkMode}
            checked={isDarkMode}
          />
          <span class="circle"></span>
        </label>
      </nav>
      <div className="container">
        <div className="search-container">
          <div class="search">
            <input
              class="search-txt"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Search country name"
            />
            <button class="search-btn" onClick={fetchCountryData}>
              <i class="fas fa-search"></i>
            </button>
          </div>
          <button className="all-countries-btn" onClick={fetchAllCountries}>
            Show All Countries
          </button>
        </div>
        {loading && <div className="custom-loader"></div>}
        {error && <p className="error">Input Valid Country Name</p>}
        {countryData && !showAllCountries && (
          <div className="wrapper">
            <div className="country-card">
              <div
                className="country-card-img"
                style={{ backgroundImage: `url(${countryData[0].flags.png})` }}
              ></div>

              <div className="country-card-info">
                <h2 className="country-name">{countryData[0].name}</h2>
                <p>
                  <span className="title">Population:</span>{" "}
                  {countryData[0].population}
                </p>
                <p>
                  <span className="title">Capital:</span>{" "}
                  {countryData[0].capital}
                </p>
                <p>
                  <span className="title">Region:</span> {countryData[0].region}
                </p>
                <p>
                  <span className="title">Languages:</span>{" "}
                  {formatLanguages(countryData[0].languages)}
                </p>
                <p>
                  <span className="title">Currencies:</span>{" "}
                  {formatCurrencies(countryData[0].currencies)}
                </p>
              </div>
            </div>
          </div>
        )}
        {showAllCountries && (
          <div className="all-country">
            {allCountries.map((country) => (
              <div
                key={country.alpha3Code}
                className="country-card all-country-card"
              >
                <div
                  className="country-card-img"
                  style={{ backgroundImage: `url(${country.flags.png})` }}
                ></div>
                <div className="country-card-info">
                  <h3>{country.name}</h3>
                  <p>
                    <span className="title">Capital:</span> {country.capital}
                  </p>
                  <p>
                    <span className="title">Population:</span>{" "}
                    {country.population}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const formatLanguages = (languages) => {
  if (Array.isArray(languages)) {
    return languages.map((lang) => lang.name).join(", ");
  } else if (typeof languages === "object") {
    return Object.values(languages).join(", ");
  } else {
    return "N/A";
  }
};

const formatCurrencies = (currencies) => {
  if (Array.isArray(currencies)) {
    return currencies.map((currency) => currency.name).join(", ");
  } else if (typeof currencies === "object") {
    return Object.values(currencies).join(", ");
  } else {
    return "N/A";
  }
};

export default CountryInformationApp;
