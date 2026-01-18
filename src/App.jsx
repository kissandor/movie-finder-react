import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import MovieList from './components/MovieList'
import Loader from './components/Loader'
import { fetchMovies, fetchPopularMovies } from './api/tmdb'


function App() {

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // helper delay function
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    async function doFetch() {
      try {
        const fetchedMovies = await fetchMovies(query);
        await delay(1000); // legalább 1000ms
        setMovies(fetchedMovies)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    doFetch();
  }, [query]);

  //popular movies, run first
  useEffect(() => {
    setLoading(true);
    async function doFetch() {
      try {
        const fetchedMovies = await fetchPopularMovies();
        //await delay(1000); // legalább 1000ms
        setMovies(fetchedMovies)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    doFetch();
  }, []);


  const handleSearch = (query = "") => {
    if (!query.trim()) return
    setQuery(query);
    setMovies([]);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container">
        <SearchBar onSearch={handleSearch} />
        <MovieList movies={movies} />
      </div>
    </>
  )
}

export default App
