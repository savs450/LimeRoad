import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import axios from "axios";
import Cards from "../Cards";
import Pagination from "../Pagination";
const DetailModal = lazy(() => import("../DetailModal"));

function Homepage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setfilteredMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2023&page=${currentPage}&vote_count.gte=100`;
  
  async function fetchData() {
    try {
      const response = await axios.get(url);
      if (response && response.data) {
        console.log("999", response.data);
        setTotalResults(response.data.total_results);
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


  function handleInputchange(e) {
    setQuery(e.target.value);
  }
  function searchMovie(e) {
    // e.preventDefault()
    const searchTerm = query.toLowerCase().replace(/\s+/g, ""); //Removes ALL whitespace characters, including spaces between words ,The \s+ matches one or more whitespace characters
    const searchedResults = movies.filter((movie) => {
      const movieTitle = movie.title.toLowerCase().replace(/\s+/g, "");
      return movieTitle.includes(searchTerm) 
    });
    setfilteredMovies(searchedResults);
    setCurrentPage(1);
  }

  function handleCardClick(movie) {
    setIsOpen(true);
    setSelectedMovie(movie);
  }

function handlePageChange(page){
  console.log("page kaisa hota h ",page)
  setCurrentPage(page)
  window.scroll(0,0);
}


  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div>
      <h2 className="text-5xl p-4 bg-slate-600 font-semibold">MovieFlix</h2>
      <div>
        <input
          className="rounded-20px m-5 border-2 border-gray-950 px-8 pb-3 pt-3 w-9/12"
          placeholder="Enter Tv shows or movies you want to search ..."
          value={query}
          onChange={handleInputchange}
          onKeyDown={(e)=>searchMovie(e)}
        ></input>
      </div>
      <div className="flex flex-wrap gap-5 mt-5 justify-around">
        {filteredMovies && filteredMovies.length>0 ?(
             filteredMovies.map((item, i) => (
              <Cards
                key={i}
                id={item.id}
                poster={item.poster_path}
                title={item.title || item.name}
                date={item.release_date}
                media_type="movie"
                vote_average={item.vote_average}
                onClick={() => handleCardClick(item)}
              />
            ))
        ):(<div className="text-center w-full text-2xl text-black-600">No Movies Found :(</div>)
       }
      </div>
      <div>
        <Pagination currentPage={currentPage} totalResults={totalResults} onPageChange ={(page)=>handlePageChange(page)} />
      </div>
      {isOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <DetailModal
            details={selectedMovie}
            onClose={() => setIsOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}

export default Homepage;
