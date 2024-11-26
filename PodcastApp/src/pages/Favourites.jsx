import React, { useEffect, useState } from "react";

function Favourites() {
  const [favourites, setFavourites] = useState([]);

  // Loading favs from localStorage

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  if (favourites.length === 0) {
    return (
      <div>
        <h1>FAVOURITES</h1>
        <p>You don't have any favourites</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Favourites</h1>
      <ul>
        {favourites.map((fav, index) => (
          <li key={index}>
            <p>
              <strong>Episode:</strong> {fav.episodeTitle}
            </p>
            <p>
              <strong>Show:</strong> {fav.showTitle}
            </p>
            <p>
              <strong>Season:</strong> {fav.seasonTitle}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favourites;
