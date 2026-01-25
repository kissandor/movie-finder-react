import { useState, useRef, useEffect } from 'react'
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSentinelVisible, setIsSentinelVisible] = useState(false);
  const [canLoadNextPage, setCanLoadNextPage] = useState(false);
  const sentinelRef = useRef(null)


  //popular movies, run first
  useEffect(() => {
    setLoading(true);
    setPage(1);
    setTotalPages(1);
    async function doFetch() {
      try {
        const fetchedMovies = await fetchPopularMovies();
        await delay(1000); // legalább 1000ms
        setMovies(fetchedMovies.results)
        setTotalPages(fetchedMovies.total_pages)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
        setCanLoadNextPage(false)
      }
    }
    doFetch();
  }, []);


  useEffect(() => {
    if (!canLoadNextPage) return

    const nextPage = page + 1;

    async function doFetch() {
      try {
        setLoading(true);
        let fetchedMovies = null;
        if(query.length>0) {
          fetchedMovies = await fetchMovies(query, nextPage);
        } else {
          fetchedMovies = await fetchPopularMovies(nextPage);
        }
        console.log(`Page : ${nextPage}`)
        await delay(1000); // legalább 1000ms
        setMovies(prev => [...prev, ...fetchedMovies.results])
        setPage(nextPage)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
        setCanLoadNextPage(false)
        setIsSentinelVisible(false);
      }
    }

    doFetch();
  }, [canLoadNextPage, query.length]);


  useEffect(() => {
    if (error) return;
    if (loading) return;
    if (!isSentinelVisible) return;
    if (movies.length === 0) return;
    if (page >= totalPages) return;
    if (canLoadNextPage) return;
    setCanLoadNextPage(true)

  }, [isSentinelVisible, loading, totalPages, page, error, movies.length])


  //ez csak figyeli a szentinel elemet es jele
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsSentinelVisible(entry.isIntersecting))
      console.log("I see you")
    }, {
      root: null,
      rootMargin: '10px',
      threshold: 0,
    });

    observer.observe(node)

    return () => {
      observer.disconnect();
    }
  }, [movies.length])

  // helper delay function
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    setPage(1);
    setTotalPages(1);
    async function doFetch() {
      try {
        const fetchedMovies = await fetchMovies(query);
        await delay(1000); // legalább 1000ms
        setMovies(fetchedMovies.results);
        setTotalPages(fetchedMovies.total_pages);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    doFetch();
  }, [query]);


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
      {movies.length > 0 && <div className="sentinel" ref={sentinelRef}></div>}
      {loading ? <Loader /> : <div></div>}
      </div>
    </>
  )
}

export default App
