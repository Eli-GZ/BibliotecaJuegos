import { useState } from "react";
import { useEffect } from "react";

function Show() {
  

  return (
    <div>
      <h1>Movies</h1>
      {/* <div className="search-container">
        <input
          type="text"
          placeholder="Search Movies..."
          value={}
          onChange={handleSearchChange}
        />
      </div> */}
      {/* <div className="movie-list">
        {loading ? (
          <Vortex 
            height={120}
            width={120}
            color="#12c2e9"
            ariaLabel="puff-loading"
          />
        ) : filteredMovies.length > 0 ? (
          filteredMovies.map((movie, i) => (
            <Card
              key={i}
              title={movie.title}
              imageUrl={movie.imageUrl}
              year={movie.year}
              imdbLink={movie.imdbLink}
            />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div> */}
    </div>
  );
}

export default Show;