import MovieCard from './MovieCard'
import '../style/components.css'

function MovieList({ movies }) {
    return (
        <div className="movie-list">
            {
                movies.map((movie) => {
                    return <MovieCard key={movie.id} movie={movie} />
                }
                )
            }
        </div>
    )
}


export default MovieList