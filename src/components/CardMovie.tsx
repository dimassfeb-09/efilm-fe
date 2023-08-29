import {Link} from "react-router-dom";

type cardMovieProps = {
    movie: MoviesType
}

const CardMovie = (props: cardMovieProps) => {
    console.log(props.movie.poster_url)
    return (
        <Link to={`/movies/${props.movie.id}`}>
            <div className="inline-block mr-5">
                <img
                    className="w-44 h-64 max-w-xs overflow-hidden rounded-lg shadow-md
                                        bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out
                                        mb-2"
                    src={import.meta.env.VITE_FIREBASE_IMAGE_PATH+ props.movie.poster_url+'?alt=media'}
                    alt={props.movie.title}
                />
                <div className="w-44 overflow-auto font-semibold">{props.movie.title}</div>
                <div>{props.movie.release_date.split("-")[0]}</div>
            </div>
        </Link>
    );
};

export default CardMovie;