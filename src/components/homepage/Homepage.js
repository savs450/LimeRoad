import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../Cards";

function Homepage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setfilteredMovies] = useState([]);
  const [query, setQuery] = useState("");
  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2023&page=1&vote_count.gte=100";
  async function fetchData() {
    try {
      const response = await axios.get(url);
      if (response && response.data) {
        console.log("999", response.data);
        setMovies(response.data.results);
        setfilteredMovies(response.data.results);
      } else {
        console.log("Error:Invalid response data");
        return;
      }
    } catch (error) {
      console.warn("Fetching failed", error);
    }
  }
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      const searchTerm = query.toLowerCase().replace(/\s+/g, ""); //Removes ALL whitespace characters, including spaces between words ,The \s+ matches one or more whitespace characters

      const searchedResults = movies.filter((movie) => {
        const movieTitle = movie.title.toLowerCase().replace(/\s+/g, "");
        return movieTitle.includes(searchTerm);
      });
      setfilteredMovies(searchedResults);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-5xl p-4 bg-slate-600 font-semibold">MovieFlix</h2>
      <div>
        <input
          className="rounded-20px m-5 border-2 border-gray-950 px-8 pb-3 pt-3 w-9/12"
          placeholder="Enter Tv shows or movies you want to search ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        ></input>
      </div>
      <div className="flex flex-wrap gap-5 mt-5 justify-around">
        {/* <div className="flex  justify-around flex-wrap gap-x-0"> */}
        {filteredMovies &&
          filteredMovies.map((item, i) => (
            <Cards
              key={i}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.release_date}
              media_type="movie"
              vote_average={item.vote_average}
            />
          ))}
      </div>
    </div>
  );
}

export default Homepage;
