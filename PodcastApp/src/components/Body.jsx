import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/Body.css";

function Body() {
  // setting our states:
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((response) => response.json())
      .then((data) => {
        setPodcasts(data);
      })
      .catch((error) => {
        console.error("Error fetching podcast data:", error);
      });
  }, []);

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
        <p>Loading podcasts...</p>
      )}
    </div>
  );
}
export default Body;
