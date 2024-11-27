import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/Body.css";

function Body() {
  // setting our states:
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("A-Z");

  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch podcasts");
        }
        return response.json();
      })
      .then((data) => {
        // sort alphabetically by default
        const sortPodcasts = data.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setPodcasts(sortPodcasts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Function to handle sort order changes:
  const manageSortOrderChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);

    // Sort podcasts based on the selected order:
    const sortedPodcasts = [...podcasts].sort((a, b) => {
      if (order === "A-Z") {
        return a.title.localeCompare(b.title);
      } else if (order === "Z-A") {
        return b.title.localeCompare(a.title);
      } else if (order === "Newly Updated") {
        return new Date(b.updated) - new Date(a.updated);
      } else if (order === "Oldest Updated") {
        return new Date(a.updated) - new Date(b.updated);
      }
      return 0; // Default fallback
    });
    setPodcasts(sortedPodcasts);
  };

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
      <div>
        <label htmlFor="sort-order">Sort by: </label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={manageSortOrderChange}
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Newly Updated">Newly Updated</option>
          <option value="Oldest Updated">Oldest Updated</option>
        </select>
      </div>
      <h2>Podcasts</h2>

      {/* Sorting dropdown */}

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
              <p className="podcast-updated">
                Last Updated: {new Date(podcast.updated).toLocaleDateString()}
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
