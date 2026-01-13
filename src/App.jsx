import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import MovieList from './components/MovieList'
import { fetchMovies, fetchPopularMovies } from './api/tmdb'


function App() {

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    async function doFetch() {
      try {
        const fetchedMovies = await fetchMovies(query);
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
    async function doFetchPopularMovies() {
      try {
        const fetchedMovies = await fetchPopularMovies();
        setMovies(fetchedMovies)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    doFetchPopularMovies();
  }, []);

  const handleSearch = (query = "") => {
    if (!query.trim()) return
    setQuery(query);
    setMovies([]);
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
