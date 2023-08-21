import {useEffect, useState} from "react";
import axios from "axios";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import {Link} from "react-router-dom";

export default function Home() {

    const [trending, setTrending] = useState<Movies[] | null>(null);

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
                        slidesPerView={3}
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
                            return <SwiperSlide>
                                <Link to={`/movies/${movie.id}`}>
                                    <div className="absolute p-5  text-white">
                            <span
                                className="font-bold text-2xl">{movie.title} </span>
                                        ({movie.release_date.split("-")[0]})
                                    </div>
                                    <img
                                        src={movie.poster_url}
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
                                    return <Link to={`/movies/${movie.id}`}>
                                        <div className="inline-block mr-5">
                                            <img
                                                className="w-44 h-64 max-w-xs overflow-hidden rounded-lg shadow-md
                                        bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out
                                        mb-2"
                                                src={movie.poster_url}
                                                alt={movie.title}
                                            />
                                            <div className="w-44 overflow-auto font-semibold">{movie.title}</div>
                                            <div>{movie.release_date.split("-")[0]}</div>
                                        </div>
                                    </Link>;
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
                                    return <Link to={`/movies/${movie.id}`}>
                                        <div className="inline-block mr-5">
                                            <img
                                                className="w-44 h-64 max-w-xs overflow-hidden rounded-lg shadow-md
                                        bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out
                                        mb-2"
                                                src={movie.poster_url}
                                                alt={movie.title}
                                            />
                                            <div className="w-44 overflow-auto font-semibold">{movie.title}</div>
                                            <div>{movie.release_date.split("-")[0]}</div>
                                        </div>
                                    </Link>;
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
                                    return <Link to={`/movies/${movie.id}`}>
                                        <div className="inline-block mr-5">
                                            <img
                                                className="w-44 h-64 max-w-xs overflow-hidden rounded-lg shadow-md
                                        bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out
                                        mb-2"
                                                src={movie.poster_url}
                                                alt={movie.title}
                                            />
                                            <div className="w-44 overflow-auto font-semibold">{movie.title}</div>
                                            <div>{movie.release_date.split("-")[0]}</div>
                                        </div>
                                    </Link>;
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}
