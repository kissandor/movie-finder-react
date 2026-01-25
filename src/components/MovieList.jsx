import MovieCard from './MovieCard'
import '../style/components.css'


function MovieList({ movies, sentinelRef }) {
    return (
        <div className="movie-list">
            {
                movies.map((movie) => {
                    return <MovieCard key={movie.id} movie={movie} />
                }
                )
            }
            <div className="sentinel" ref={sentinelRef}></div>
        </div>
    )
}


export default MovieList