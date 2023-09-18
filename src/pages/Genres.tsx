import axios from "axios";
import {useEffect, useState} from "react";
import "swiper/css";
import "swiper/css/pagination";
import CardMovie from "../components/CardMovie.tsx";
import {
FilterList,
    KeyboardArrowDown,
    KeyboardArrowUp
} from "@mui/icons-material";

const Genres = () => {

    const [genre, setGenre] = useState<GenresType | null>(null);
    const [genres, setGenres] = useState<GenresType[] | null>(null);
    const [movies, setMovies] = useState<MoviesType[] | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<number>(0);
    const [isFilteredVisible, setIsFilteredVisible] = useState<boolean>(false);

    const fetchDataAllMovies = async () => {
        try {
            const APIURL = import.meta.env.VITE_URL_API;
            const response = await axios.get(`${APIURL}/movies`);
            setMovies(response.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchDataAllGenres = async () => {
        try {
            const APIURL = import.meta.env.VITE_URL_API;
            const response = await axios.get(`${APIURL}/genres`);
            const dataGenres = response.data.data.map((genre: { id: number, name: string }) => {
                return {genre_id: genre.id, name: genre.name}
            })
            const updatedGenres = [{ genre_id: 0, name: "All" }, ...dataGenres];
            setGenres(updatedGenres)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchDataAllGenres();
        fetchDataAllMovies();
        console.log(movies);
    }, []);

    useEffect(() => {
        if (selectedFilter != 0) {
            const filter = genres?.filter((v)=> v.genre_id == selectedFilter) ?? null;
            console.log(filter);
            // setFilterGenre(filter);
        }
        // console.log(filterGenre);
    }, []);

    return (
        <div className="h-44">
            <div>
                <div className="flex flex-row justify-center items-center  mt-10 gap-5">
                    <input type="text" className="w-1/2 h-10 border-2 px-2 border-gray-400 rounded-md"/>
                    <div className="text-xl font-bold" onClick={()=> setIsFilteredVisible(!isFilteredVisible)}><FilterList/> {isFilteredVisible ?  <KeyboardArrowUp/> : <KeyboardArrowDown/>}</div>
                </div>
                <div className="m-5">
                    <div className={`${isFilteredVisible ? 'block' : 'hidden'} grid grid-cols-4 md:grid-cols-10 gap-2 text-sm mt-5`}>
                        {genres?.map((v)=> <div
                            className="bg-gray-300 text-black hover:bg-primaryColor hover:text-white py-2 flex justify-center rounded-md"
                            onClick={()=>{
                                setSelectedFilter(v.genre_id ?? 0);
                            }}
                        >
                            {v.name}
                        </div>)}
                    </div>
                </div>
                {
                    selectedFilter != 0 ? genres?.map((genre)=> {
                        if (genre.genre_id == selectedFilter) {
                            return <div>
                                <div className="p-5 text-xl font-bold">{genre.name}</div>
                                <div className="flex">
                                    <div className="flex flex-nowrap px-5 overflow-x-scroll hidden-overflow w-full">
                                        {movies?.map((movie)=> movie.genre_ids?.map((genre_id)=> {
                                            if (genre_id == genre.genre_id) {
                                                return  <CardMovie
                                                    key={movie.id}
                                                    movie_id={movie.id}
                                                    poster_url={movie.poster_url}
                                                    release_date={movie.release_date}
                                                    title={movie.title}
                                                />;
                                            }
                                        }))}
                                    </div>
                                </div>
                            </div>
                        }
                    }) : genres?.map((genre)=> <div>
                        <div className="p-5 text-xl font-bold">{genre.name}</div>
                        <div className="flex">
                            <div className="flex flex-nowrap px-5 overflow-x-scroll hidden-overflow w-full">
                                {movies?.map((movie)=> movie.genre_ids?.map((genre_id)=> {
                                    if (genre_id == genre.genre_id) {
                                        return  <CardMovie
                                            key={movie.id}
                                            movie_id={movie.id}
                                            poster_url={movie.poster_url}
                                            release_date={movie.release_date}
                                            title={movie.title}
                                        />;
                                    }
                                }))}
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Genres;
