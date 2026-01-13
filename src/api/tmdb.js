const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    // WARNING: API token exposed for demo purposes only
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTY3NzQ0NzNlYmQwYWZjMmIzYTgxMzc2N2IxMmFjNCIsIm5iZiI6MTc2NzIyNDYxOC44MTc5OTk4LCJzdWIiOiI2OTU1YjUyYWNiNzgzNGE1OTM4OGVmM2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.O51WwXXloHHnuRGDsjU2yE3QtniMhNtc4gtmSe9mUrs'
  }
};

const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular`, options);
    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (err) {
    console.log(err);
    return (err);
  }
}


export async function fetchMovies(query, page = 1) {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`, options);
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (err) {
    console.log(err);
    return (err);
  }
}


