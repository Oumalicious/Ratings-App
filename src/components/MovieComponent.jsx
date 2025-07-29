import { Link } from 'react-router-dom'

const MovieComponent = ({ movie }) => {
  return (
     <Link to={`/movies/${movie.id}`} className="movie__item">
            <div className="movie__header">
                <div className="movie__image">
                    <img src={`data:${movie.fileType};base64,${movie.data}`} alt={movie.originalTitle} />
                </div>
                <div className="movie__details">
                    <p className="movie_name">{movie?.title?.substring(0, 15)} </p>
                </div>
            </div>
            <div className="movie__body">
                <p>Title: {movie.title}</p>
                <p>Original Title: {movie.originalTitle}</p>
                <p>Country: {movie.country}</p>
                <p>Rating: {movie.rating}</p>
            </div>
        </Link>
  )
}

export default MovieComponent