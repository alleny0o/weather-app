import React, { useState } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'; // Import bookmark icons
import styles from './Home.module.css'; // Import your CSS module

const Home = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarked, setBookmarked] = useState(false); // State for bookmark toggle

  const token = localStorage.getItem('token'); // Assuming the token is stored here

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch('http://localhost:5000/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data.');
      }

      const data = await response.json();
      setWeather(data);

      // Check if city is bookmarked
      if (token) {
        const bookmarkResponse = await fetch('http://localhost:5000/api/bookmarks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (bookmarkResponse.ok) {
          const bookmarksData = await bookmarkResponse.json();
          console.log('Bookmarked cities:', bookmarksData);
          setBookmarked(bookmarksData.cities.includes(city));
        }
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async () => {
    if (!token) {
      setError('You must be logged in to bookmark a city.');
      return;
    }

    try {
      const url = `http://localhost:5000/api/bookmarks/${bookmarked ? 'remove' : 'add'}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update bookmark.');
      }

      const result = await response.json();
      setBookmarked(!bookmarked); // Toggle bookmark state
      console.log(result.message); // Log success message
    } catch (err) {
      console.error('Error updating bookmark:', err);
      setError(err.message || 'An error occurred while updating bookmarks.');
    }
  };

  return (
    <div className={`container ${styles.home}`}>
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <form onSubmit={handleFormSubmit} className={styles.form}>
            <h1 className={styles.title}>Weather Finder</h1>
            <div className={styles.inputGroup}>
              <input
                type="text"
                className={`form-control ${styles.input}`}
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={`btn btn-primary ${styles.button}`} disabled={loading}>
              {loading ? 'Fetching...' : 'Get Weather'}
            </button>
          </form>

          {error && <div className={styles.error}>{error}</div>}

          {weather && (
            <div className={styles.weatherInfo}>
              {token && (
                <div className={styles.bookmark} onClick={toggleBookmark}>
                  {bookmarked ? <FaBookmark className={styles.icon} /> : <FaRegBookmark className={styles.icon} />}
                </div>
              )}
              <h2>Weather in {weather.data[0].city_name}</h2>
              <p>Temperature: {weather.data[0].temp}°C</p>
              <p>Condition: {weather.data[0].weather.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
