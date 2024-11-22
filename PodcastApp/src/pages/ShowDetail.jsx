import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../pages/ShowDetail.css";

function ShowDetail() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectSeason] = useState(null); //NOTE TO SELF :: should this be 1?

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
        setSelectSeason(data.seasons[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const chooseSeason = (event) => {
    const seasonNumber = parseInt(event.target.value, 10);
    const selected = podcast.seasons.find(
      (season) => season.season === seasonNumber
    );
    setSelectSeason(selected);
  };

  if (loading) return <p>Loading podcast details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="show">
      <h1>{podcast.title}</h1>
      <img
        src={podcast.image}
        alt={podcast.title}
        className="podcast-detail-image"
      />
      <p>{podcast.description}</p>
      <p>
        <strong>Last Updated:</strong> {podcast.updated}
      </p>

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

      {selectedSeason && (
        <div className="episodes">
          <h2>{selectedSeason.title}</h2>
          {selectedSeason.episodes.map((episode, index) => (
            <div key={index} className="episode-card">
              <h3>
                Episode {episode.episode}: {episode.title}
              </h3>
              <p>{episode.description}</p>
              <audio controls>
                <source src={episode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowDetail;
