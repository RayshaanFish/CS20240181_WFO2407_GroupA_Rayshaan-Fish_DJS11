import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/Body.css";

function Body() {
  // setting our states:
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch podcasts");
        }
        return response.json();
      })
      .then((data) => {
        setPodcasts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="body">
        <p>Loading podcasts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="body">
        <p>Error: {error}</p>
      </div>
    );
  }
  return (
    <div className="body">
      <h2>Podcasts</h2>
      {podcasts.length > 0 ? (
        <div className="podcast-grid">
          {podcasts.map((podcast, index) => (
            <div key={index} className="podcast-card">
              <Link to={`/show/${podcast.id}`}>
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  className="podcast-image"
                />
              </Link>
              <p>
                <Link to={`/show/${podcast.id}`} className="podcast-title">
                  {podcast.title}
                </Link>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No podcasts found...</p>
      )}
    </div>
  );
}
export default Body;
