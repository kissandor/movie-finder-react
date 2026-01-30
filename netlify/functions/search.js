import { tmdbFetch } from './_tmdb.js';

export async function handler(event) {
  try {
    const query = event.queryStringParameters?.query;

    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Query is required' }),
      };
    }

    const data = await tmdbFetch(`/search/movie?query=${encodeURIComponent(query)}`);

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
