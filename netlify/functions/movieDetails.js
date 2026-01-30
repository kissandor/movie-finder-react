import { tmdbFetch } from './_tmdb.js';

export async function handler(event) {
  try {
    const id = event.path.split('/').pop();

    const data = await tmdbFetch(`/movie/${id}`);

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
