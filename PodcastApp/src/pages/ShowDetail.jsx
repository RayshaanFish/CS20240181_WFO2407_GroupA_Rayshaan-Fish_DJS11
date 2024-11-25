import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../pages/ShowDetail.css";

function ShowDetail() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectSeason] = useState(null); //NOTE TO SELF :: should this be 1?
  const backNav = useNavigate();

  //   Fetching show details
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
          setSelectSeason(data.seasons[0]); //first season default
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  //   season dropdown
  const chooseSeason = (event) => {
    const seasonNumber = parseInt(event.target.value, 10);
    const selected = podcast.seasons.find(
      (season) => season.season === seasonNumber
    );
    setSelectSeason(selected);
  };

  if (loading) return <p>Loading podcast details...</p>;
  if (error) return <p>Error: {error}</p>;

  //   Format Date
  const formatDate = (isoDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };

  return (
    <div className="show">
      <button className="back-button" onClick={() => backNav(-1)}>
        ← Back
      </button>
      <h1>{podcast.title}</h1>
      <img
        src={podcast.image}
        alt={podcast.title}
        className="podcast-detail-image"
      />
      <p>{podcast.description}</p>

      {/* season drop down */}
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

      {/* Episode list - NOTE TO SELF not sure if I want this */}
      <div className="episodes-list">
        <h2>{selectedSeason.title}</h2>
        {selectedSeason.episodes.map((episode) => (
          <div key={episode.episode}>
            <p>{episode.title}</p>
          </div>
        ))}
      </div>

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
