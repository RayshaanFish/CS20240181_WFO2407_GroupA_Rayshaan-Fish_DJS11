import React, { useEffect, useState } from "react";

function Favourites() {
  const [favourites, setFavourites] = useState([]);

  // Loading favs from localStorage

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  //   remove favourtie from episode list in favourites
  const removeFavourite = (episodeId) => {
    const updatedFavourites = favourites.filter((fav) => fav.id !== episodeId);
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  if (favourites.length === 0) {
    return (
      <div>
        <h1>FAVOURITES</h1>
        <p>You don't have any favourites</p>
      </div>
    );
  }

  // Group favourites by show and season
  const groupedFavourites = favourites.reduce((acc, fav) => {
    const { showTitle, seasonTitle } = fav;
    if (!acc[showTitle]) {
      acc[showTitle] = {};
    }
    if (!acc[showTitle][seasonTitle]) {
      acc[showTitle][seasonTitle] = [];
    }
    acc[showTitle][seasonTitle].push(fav);
    return acc;
  }, {});

  return (
    <div>
      <h1>Favourites</h1>
      {Object.entries(groupedFavourites).map(([show, seasons]) => (
        <div key={show} className="favourites-show">
          <h2>Show: "{show}"</h2>
          {Object.entries(seasons).map(([season, episodes]) => (
            <div key={season} className="favourites-season">
              <h3>
                {" "}
                {season.includes("Season") ? season : `Season ${season}`}
              </h3>
              <ul>
                {episodes.map((episode, index) => (
                  <li key={index}>
                    <p>
                      Episode {episode.id.split("-episode-")[1]}: "
                      {episode.episodeTitle}"
                    </p>
                    {/* Remove Fav button */}
                    <button
                      onClick={() => removeFavourite(episode.id)}
                      className="remove-btn"
                    >
                      Remove from Favourties
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Favourites;
