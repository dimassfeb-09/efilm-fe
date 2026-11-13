import {useEffect, useState} from "react";
import axios from "axios";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import {Link} from "react-router-dom";
import {FIREBASE_PATH} from "../constant/constant.ts";
import CardMovie from "../components/CardMovie.tsx";

export default function Home() {

    const [recommendation, setRecommendation] = useState<RecommendationMoviesType[] | null>(null);
    const [movies, setMovies] = useState<MoviesType[] | null>(null);
    const [nationals, setNationals] = useState<National[] | null>(null);

    const APIURL = import.meta.env.VITE_URL_API;

    const fetchDataMoviesRecommendation = async () => {
        try {
            const response = await axios.get(`${APIURL}/movies/recommendation`)
            setRecommendation(response.data.data);
        } catch (e) {
            console.log(e)
        }
    }

    const fetchDataMovies = async () => {
        try {
            const response = await axios.get(`${APIURL}/movies`)
            setMovies(response.data.data);
        } catch (e) {
            console.log(e)
        }
    }

    const fetchDataNationals = async () => {
        try {
            const response = await axios.get(`${APIURL}/nationals`)
            const data: National[] = response.data.data.map((national: National): National => {
                return {id: national.id, name: national.name}
            });
            setNationals(data);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchDataMovies();
        fetchDataMoviesRecommendation();
        fetchDataNationals();
    }, [])

    return <>
        <div className="w-full sm:flex sm:justify-center pb-20">
            <div className="sm:w-3/4">
                <div>
                    <div className="p-5 text-xl font-bold">Trending</div>
                    <Swiper
                        className="mySwiper h-44"
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={30}
                        slidesPerView={2}
                        centeredSlides={false}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            stopOnLastSlide: false,
                            pauseOnMouseEnter: true,
                            reverseDirection: true,
                            waitForTransition: true,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                    >
                        {recommendation?.map((movie) => {
                            return <SwiperSlide key={movie.movie_id}>
                                <Link to={`/movies/${movie.movie_id}`}>
                                    <div className="absolute p-5  text-white">
                            <span
                                className="font-bold text-2xl">{movie.title} </span>
                                        ({movie.release_date.split("-")[0]})
                                    </div>
                                    <img
                                        src={FIREBASE_PATH + movie.poster_url + '?alt=media'}
                                        alt={movie.title}
                                        className="object-cover h-48 w-full"/>
                                </Link>
                            </SwiperSlide>;
                        })}
                    </Swiper>
                </div>
                {nationals?.map((national) => {
                    const nationalMovies = movies?.filter((movie) => movie.national_id === national.id) ?? [];
                    if (nationalMovies.length === 0) {
                        return null;
                    }
                    return (
                        <div key={national.id}>
                            <div className="p-5 text-xl font-bold">{national.name}</div>
                            <div className="flex">
                                <div className="flex flex-nowrap px-5 overflow-x-scroll hidden-overflow w-full">
                                    {movies?.map((movie) => {
                                        if (movie.national_id === national.id) {
                                            return <CardMovie
                                                key={movie.id}
                                                movie_id={movie.id}
                                                title={movie.title}
                                                release_date={movie.release_date}
                                                poster_url={movie.poster_url}
                                            />;
                                        }
                                        return null;
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    </>;
}
