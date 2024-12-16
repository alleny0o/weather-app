import React, { useEffect, useState } from 'react';

const SavedCities = () => {
  const [savedCities, setSavedCities] = useState([]); // State to store the cities
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to show loading state

  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  useEffect(() => {
    const fetchSavedCities = async () => {
      if (!token) {
        setError('You must be logged in to view saved cities.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/bookmarks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch saved cities.');
        }

        const data = await response.json();
        setSavedCities(data.cities || []); // Update the savedCities state
      } catch (err) {
        console.error('Error fetching saved cities:', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedCities();
  }, [token]);

  if (loading) {
    return <div className="text-center mt-5">Loading saved cities...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Saved Cities</h2>
      {savedCities.length === 0 ? (
        <div className="text-center">You have no saved cities.</div>
      ) : (
        <div className="row">
          {savedCities.map((city, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-center">{city}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCities;