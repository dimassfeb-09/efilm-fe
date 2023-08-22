import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "swiper/css";
import "swiper/css/pagination";

const Genres = () => {

    const [genre, setGenre] = useState<GenresType | null>(null);
    const [movies, setMovies] = useState<MoviesType[] | null>(null);

    const {id} = useParams();

    const fetchDataGenres = async () => {
        try {
            const APIURL = import.meta.env.VITE_URL_API;
            const response = await axios.get(`${APIURL}/genres/${id}/movies`);
            setMovies(response.data.data.movies);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchGenreByID = async () => {
        try {
            const APIURL = import.meta.env.VITE_URL_API;
            const response = await axios.get(`${APIURL}/genres/${id}`);
            setGenre(response.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchDataGenres();
        fetchGenreByID();
    }, []);

    return (
        <div className="h-44">
            <div>
                <div className="p-5 text-xl font-bold">Genre {genre?.name}</div>
                <div className="flex">
                    <div className="flex flex-nowrap px-5 overflow-x-scroll hidden-overflow w-full">
                        {movies?.map((movie) => {
                            if (movie) {
                                return (
                                    <Link to={`/movies/${movie.id}`} key={movie.id}>
                                        <div className="inline-block mr-5">
                                            <img
                                                className="w-44 h-64 max-w-xs overflow-hidden rounded-lg shadow-md
                                        bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out
                                        mb-2"
                                                src={movie.poster_url}
                                                alt={movie.title}
                                            />
                                            <div className="w-44 overflow-auto font-semibold">
                                                {movie.title}
                                            </div>
                                            <div>{movie.release_date.split("-")[0]}</div>
                                        </div>
                                    </Link>
                                );
                            }
                            return <div>Data not found</div>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Genres;
