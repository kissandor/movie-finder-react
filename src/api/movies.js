export async function fetchPopularMovies(page = 1) {
  const res = await fetch(`/api/popular?page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch popular movies');
  return res.json();
}