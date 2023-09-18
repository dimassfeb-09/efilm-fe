import axios from "axios";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "swiper/css";
import "swiper/css/pagination";
import CardMovie from "../components/CardMovie.tsx";

const GenresByID = () => {

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
                                    <CardMovie
                                        key={movie.id}
                                        movie_id={movie.id}
                                        poster_url={movie.poster_url}
                                        release_date={movie.release_date}
                                        title={movie.title}
                                    />
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

export default GenresByID;
