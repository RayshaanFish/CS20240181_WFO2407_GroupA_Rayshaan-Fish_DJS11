import React, { useEffect, useState } from "react";

function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [sortOrder, setSortOrder] = useState("A-Z");

  // Loading favs from localStorage

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  //   toggle favourite status
  const toggleFavourite = (episodeId) => {
    const updatedFavourites = favourites.filter((fav) => fav.id !== episodeId);
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  // Sort favourites

  const sortFavourites = (favourites, order) => {
    return [...favourites].sort((a, b) => {
      if (order === "A-Z") {
        return a.episodeTitle.localeCompare(b.episodeTitle);
      } else if (order === "Z-A") {
        return b.episodeTitle.localeCompare(a.episodeTitle);
      } else if (order === "Most Recent") {
        return new Date(b.addedOn) - new Date(a.addedOn);
      } else if (order === "Oldest First") {
        return new Date(a.addedOn) - new Date(b.addedOn);
      }
      return 0;
    });
  };
  //   manage sorting order change

  const manageSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const sortedFavourites = sortFavourites(favourites, sortOrder);

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

  //   TIMESTAMP because that's relative information

  //   const formatDateAndTime = (isoString) => {
  //     const options = {
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     };
  //     return new Date(isoString).toLocaleString(undefined, options);
  //   };

  return (
    <div>
      <h1>Favourites</h1>

      {/* Sorting Controls */}
      <div className="sorting-controls">
        <button
          onClick={() => manageSortOrderChange("A-Z")}
          disabled={sortOrder === "A-Z"}
        >
          Sort A-Z
        </button>
        <button
          onClick={() => manageSortOrderChange("Z-A")}
          disabled={sortOrder === "Z-A"}
        >
          Sort Z-A
        </button>
        <button
          onClick={() => manageSortOrderChange("Most Recent")}
          disabled={sortOrder === "Most Recent"}
        >
          Sort by Most Recent
        </button>
        <button
          onClick={() => manageSortOrderChange("Oldest First")}
          disabled={sortOrder === "Oldest First"}
        >
          Sort by Oldest First
        </button>
      </div>

      <ul>
        {sortedFavourites.map((fav, index) => (
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
            <p>
              <strong>Added On:</strong>{" "}
              {new Date(fav.addedOn).toLocaleString()}
            </p>
            {/* Heart Icon to toggle favourite */}
            <button
              onClick={() => toggleFavourite(fav.id)}
              className="toggle-fav-btn"
              aria-label="Toggle Favourite"
            >
              <i
                className="fas fa-heart"
                style={{ color: "red", cursor: "pointer" }}
              ></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favourites;
