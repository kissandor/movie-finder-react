export async function fetchPopularMovies(page = 1) {
    const res = await fetch(`/api/popular?page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch popular movies');
    return res.json();
}

export async function fetchMovies(query, page = 1) {
    const res = await fetch(`/api/search/movie?query=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to fetch movies');
    return res.json();
}

export async function fetchOneMovieCastById(id) {
    const res = await fetch(`/api/movieDetails/${id}/credits`);
    if (!res.ok) throw new Error('Failed to fetch movie by id');
    
    const data = await res.json();
    console.log(data.cast)
    return data.cast;
}