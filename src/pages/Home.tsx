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

    const [trending, setTrending] = useState<MoviesType[] | null>(null);

    const fetchDataMovies = async () => {
        try {
            const APIURL = import.meta.env.VITE_URL_API;
            const response = await axios.get(`${APIURL}/movies`)
            setTrending(response.data.data);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchDataMovies();
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
                        {trending?.map((movie) => {
                            return <SwiperSlide key={movie.id}>
                                <Link to={`/movies/${movie.id}`}>
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
                <div>
                    <div className="p-5 text-xl font-bold">Korean Drama</div>
                    <div
                        className="flex">
                        <div className="flex flex-nowrap px-5 overflow-x-scroll hidden-overflow w-full">
                            {trending?.map(movie => {
                                if (movie.language == "Korean") {
                                    return <CardMovie
                                        movie={movie}
                                    />;
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="p-5 text-xl font-bold">Film</div>
                    <div
                        className="flex">
                        <div className="flex flex-nowrap px-5 overflow-x-scroll hidden-overflow w-full">
                            {trending?.map(movie => {
                                if (movie.language == "English") {
                                    return <CardMovie
                                        movie={movie}
                                    />;
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="p-5 text-xl font-bold">Drama Thailand</div>
                    <div
                        className="flex">
                        <div className="flex flex-nowrap px-5 overflow-x-scroll hidden-overflow w-full">
                            {trending?.map(movie => {
                                if (movie.language == "Thai") {
                                    return <CardMovie
                                        movie={movie}
                                    />;
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}
