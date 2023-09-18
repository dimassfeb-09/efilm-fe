import {Link} from "react-router-dom";


const CardMovie = (props: {movie_id: number, poster_url: string, title: string, release_date: string}) => {
    return (
        <Link to={`/movies/${props.movie_id}`}>
            <div className="inline-block mr-5">
                <img
                    className="w-44 h-64 max-w-xs overflow-hidden rounded-lg shadow-md
                                        bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out
                                        mb-2"
                    src={import.meta.env.VITE_FIREBASE_IMAGE_PATH+ props.poster_url+'?alt=media'}
                    alt={props.title}
                />
                <div className="w-44 overflow-auto font-semibold">{props.title}</div>
                <div>{props.release_date.split("-")[0]}</div>
            </div>
        </Link>
    );
};

export default CardMovie;