import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../pages/ShowDetail.css";

function ShowDetail() {
  const { id } = useParams(); // Get podcast ID from the URL
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

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
        <strong>Publisher:</strong> {podcast.publisher}
      </p>
      <a href={podcast.link} target="_blank" rel="noopener noreferrer">
        Listen to the Podcast
      </a>
    </div>
  );
}

export default ShowDetail;
