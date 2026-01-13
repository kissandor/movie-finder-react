import '../style/components.css'
import defaultPoster from '../assets/default_poster.png'

function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <div className="poster"><img src={movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : `${defaultPoster}`} alt={movie.title}/>
            </div>
            <div className="details">
                <p className="title">{movie.title}</p>
                <p className="release-date">{movie.release_date || "Unknown"}</p>
                <p className="overview">{ movie.overview || "No details available"}</p>
                <p className="casts">
                    Casts: ... <span class="see-more">See more</span>
                </p>
            </div>
        </div>
    )
}

export default MovieCard