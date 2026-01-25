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


  useEffect(() => {
    if (!canLoadNextPage) return

    const nextPage = page + 1;

    async function doFetch() {
      try {
        setLoading(true);
        const fetchedMovies = await fetchMovies(query, nextPage);
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
  }, [canLoadNextPage]);


  useEffect(() => {
    if (error) return;
    if (loading) return;
    if (!isSentinelVisible) return;
    if (page >= totalPages) return;
    if (canLoadNextPage) return;
    setCanLoadNextPage(true)

  }, [isSentinelVisible, loading, totalPages, page, error])


  //ez csak figyeli a szentinel elemet es jele
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsSentinelVisible(entry.isIntersecting))
    }, {
      root: null,
      rootMargin: '200px 0px',
      threshold: 0,
    });

    observer.observe(node)
   
    
    return () => {
      observer.disconnect();
    }
  }, [movies])

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
      }
    }
    doFetch();
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
        <div className="sentinel" ref={sentinelRef}></div>
      </div>
      {loading? <Loader /> : <div></div>}
    </>
  )
}

export default App
