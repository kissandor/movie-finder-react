import '../style/components.css'
import defaultPoster from '../assets/default_poster.png'
import { useState } from 'react';
import { useEffect } from 'react'
import Casts from './Casts'
import { fetchOneMovieCastById } from '../api/tmdb'

function MovieCard({ movie }) {
    const [isCastVisible, setCastVisible] = useState(false);
    const [castList, setCastList] = useState([]);

    useEffect(() => {
        if (!isCastVisible) return;
        if (castList.length > 0) return;

        async function doFetch() {
            try {
                const fetchedMovieCasts = await fetchOneMovieCastById(movie.id);
                setCastList(fetchedMovieCasts);
            } catch (err) {
                console.log(err);
            }
        }

        doFetch();
    }, [isCastVisible, movie.id]);



    return (
        <div className="movie-card">
            <div className="poster"><img src={movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : `${defaultPoster}`} alt={movie.title} />
            </div>
            <div className="details">
                <p className="title">{movie.title}</p>
                <p className="release-date">{movie.release_date || "Unknown"}</p>
                <p className="overview">{movie.overview || "No details available"}</p>
                <div className="casts">
                    <button className="show-hide-btn" onClick={() => setCastVisible(prev => !prev)}>
                        {isCastVisible ? "Hide casts:" : "Show casts:"}
                    </button>
                    {/* {isCastVisible && <Casts castList={castList} show={isCastVisible}/>} */}
                    <Casts castList={castList} show={isCastVisible}/>
                </div>
            </div>
        </div>
    )
}

export default MovieCard