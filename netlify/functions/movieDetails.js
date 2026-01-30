import { tmdbFetch } from './_tmdb.js';

export async function handler(event) {
  try {
    const parts = event.path.split('/');
    const id = parts[parts.length-2]
    
    const data = await tmdbFetch(`/movie/${id}/credits`);

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
