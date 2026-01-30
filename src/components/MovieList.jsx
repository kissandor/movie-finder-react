import Error  from './Error'
import MovieCard from './MovieCard'
import '../style/components.css'


function MovieList({ movies, error}) {


    if (error) {
        return <Error err={error}/>
    }

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