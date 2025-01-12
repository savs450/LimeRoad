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
  const [favourites,setFavourites] =useState([])

  const url = useMemo(
    () =>
      `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2023&page=${currentPage}&vote_count.gte=100`,
    [currentPage]
  );

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
      }
    } catch (error) {
      console.warn("Fetching failed", error);
    }
  }

  function handleInputchange(e) {
    setQuery(e.target.value);
  }
  function searchMovie() {
    const searchTerm = query.toLowerCase().replace(/\s+/g, ""); //Removes ALL whitespace characters, including spaces between words ,The \s+ matches one or more whitespace characters
    const searchedResults = movies.filter((movie) => {
      const movieTitle = movie.title.toLowerCase().replace(/\s+/g, "");
      return movieTitle.includes(searchTerm);
    });
    setfilteredMovies(searchedResults);
    setCurrentPage(1);
  }

  function handleCardClick(movie) {
    setIsOpen(true);
    setSelectedMovie(movie);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scroll(0, 0);
  }
  function handleToggle(movie){
    console.log("handleToggle")
    const isFavourite = favourites.some((fav)=> fav.id === movie.id)
    return isFavourite ? setFavourites.filter((fav )=>fav.id !== movie.id) : setFavourites([...favourites, movie]);
  }

  const movieCards = useMemo(() => {
    return filteredMovies && filteredMovies.length > 0 ? (
      filteredMovies.map((item, i) => (
        <Cards
          key={item.id}
          id={item.id}
          poster={item.poster_path}
          title={item.title || item.name}
          date={item.release_date}
          media_type="movie"
          vote_average={item.vote_average}
          onClick={() => handleCardClick(item)}
          toggleFavourite = {()=>handleToggle(item)}
          isFavourite ={favourites.some((fav)=> fav.id === item.id)}
        />
      ))
    ) : (
      <div className="text-center w-full text-2xl text-black-600">
        No Movies Found :(
      </div>
    );
  }, [filteredMovies,favourites]);

  const paginationComponent = useMemo(() => (
    <Pagination
      currentPage={currentPage}
      totalResults={totalResults}
      onPageChange={(page) => handlePageChange(page)}
    />
  ),[currentPage,totalResults]);

  useEffect (()=>(
    localStorage.setItem("favourites",JSON.stringify(favourites))
  ),[favourites])

  useEffect(()=>{
    const savedFavourites = JSON.parse(localStorage.getItem("favourites")) ||[]
    setFavourites(savedFavourites)
},[])
  useEffect(() => {
    fetchData();
  }, [currentPage,url]);

  return (
    <div>
      <h2 className="text-5xl p-4 bg-slate-600 font-semibold italic text-white">MovieFlix</h2>
      <div>
        <input
          className="rounded-20px m-5 border-2 border-gray-950 px-8 pb-3 pt-3 w-9/12"
          placeholder="Enter Tv shows or movies you want to search ..."
          value={query}
          onChange={handleInputchange}
          onKeyDown={(e) =>{if(e.key ==='Enter')
          { searchMovie()}
          }}
        ></input>
      </div>
      <div className="flex flex-wrap gap-5 mt-5 justify-around">
        {movieCards}
      </div>
      <div>{paginationComponent}</div>
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
