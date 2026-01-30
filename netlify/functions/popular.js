import { tmdbFetch } from './_tmdb.js';

export async function handler(event) {
  try {
    const page = event.queryStringParameters?.page || 1;
    const data = await tmdbFetch(`/movie/popular?page=${page}`);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
}
