import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../pages/ShowDetail.css";

function ShowDetail() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectSeason] = useState(null);
  const backNav = useNavigate();
  const [favourites, setFavourites] = useState([]);

  // Fetching show details
  useEffect(() => {
    const apiUrl = `https://podcast-api.netlify.app/id/${id}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch podcast details");
        }
        return response.json();
      })
      .then((data) => {
        setPodcast(data);
        if (data.seasons.length > 0) {
          setSelectSeason(data.seasons[0]); // First season as default
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Load favs from local storeage

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  //   save favs to local storage
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify("favourites"));
  }, [favourites]);

  // Season dropdown
  const chooseSeason = (event) => {
    const seasonNumber = parseInt(event.target.value, 10);
    const selected = podcast.seasons.find(
      (season) => season.season === seasonNumber
    );
    setSelectSeason(selected);
  };

  //   toggle fav status per episode
  const toggleFavorite = (episode) => {
    const episodeIdentifier = `${podcast.id}-season-${selectedSeason.season}-episode-${episode.episode}`;
    setFavourites(
      (prevFavourites) =>
        prevFavourites.includes(episodeIdentifier)
          ? prevFavourites.filter((fav) => fav !== episodeIdentifier) // Remove if already a favorite
          : [...prevFavourites, episodeIdentifier] // Add to favorites
    );
  };

  if (loading) return <p>Loading podcast details...</p>;
  if (error) return <p>Error: {error}</p>;

  // Format Date
  const formatDate = (isoDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };

  // Determine which image to show (default or season-specific)
  const showImage = selectedSeason?.image || podcast.image;

  return (
    <div className="show">
      <button className="back-button" onClick={() => backNav(-1)}>
        ← Back
      </button>
      <h1>{podcast.title}</h1>

      {/* Display the image: either the season's or the default podcast image */}
      <img
        src={showImage}
        alt={podcast.title}
        className="podcast-detail-image"
      />
      <p>{podcast.description}</p>

      {/* Season dropdown */}
      <label htmlFor="season-select">Select Season: </label>
      <select
        id="season-select"
        onChange={chooseSeason}
        value={selectedSeason?.season || ""}
      >
        {podcast.seasons.map((season) => (
          <option key={season.season} value={season.season}>
            {season.title}
          </option>
        ))}
      </select>

      <p>
        <strong>Last Updated:</strong> {formatDate(podcast.updated)}
      </p>

      {/* Season + Episode count */}
      <div className="season-info">
        <p>
          <strong>Total Seasons:</strong> {podcast.seasons.length}
        </p>
        <p>
          Number of Episodes this Season:{" "}
          {selectedSeason ? selectedSeason.episodes.length : 0}
        </p>
      </div>

      {/* Episode list */}
      <div className="episodes-list">
        <h2>{selectedSeason.title}</h2>
        {selectedSeason.episodes.map((episode) => {
          const episodeIdentifier = `${podcast.id}-season-${selectedSeason.season}-episode-${episode.episode}`;
          const isFavourite = favourites.includes(episodeIdentifier);

          return (
            <div key={episode.episode} className="episode-card">
              <h3>
                Episode {episode.episode}: {episode.title}
              </h3>
              <p>{episode.description}</p>
              <audio controls>
                <source src={episode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <button
                onClick={() => toggleFavorite(episode)}
                className="favorite-btn"
              >
                {isFavourite ? (
                  <i className="fas fa-heart" style={{ color: "red" }}></i> // Filled heart, colored red
                ) : (
                  <i className="far fa-heart" style={{ color: "gray" }}></i> // Empty heart
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowDetail;
