import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {PlayArrowOutlined} from "@mui/icons-material";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import ReactPlayer from "react-player";

const MovieDetail = () => {

    const {id} = useParams();

    const [movie, setMovie] = useState<MoviesType | null>(null);
    const [genres, setGenres] = useState<GenresType[] | null>(null);
    const [actors, setActors] = useState<ActorsType[] | null>(null);
    const [directors, setDirectors] = useState<DirectorsType[] | null>(null);

    const [openDialogTrailer, setOpenDialogTrailer] = useState<boolean>(false);

    const getMovieByID = async () => {
        try {
            const APIURL = import.meta.env.VITE_URL_API;
            const response = await axios.get(`${APIURL}/movies/${id}`)
            setMovie(response.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    const getGenresMovie = async () => {
        try {
            const APIURL = import.meta.env.VITE_URL_API;
            const response = await axios.get(`${APIURL}/movies/${id}/genres`)
            setGenres(response.data.data.genres);
        } catch (e) {
            console.log(e);
        }
    }

    const getDirectorsMovie = async () => {
        try {
            const APIURL = import.meta.env.VITE_URL_API;
            const response = await axios.get(`${APIURL}/movies/${id}/directors`)
            setDirectors(response.data.data.directors);
        } catch (e) {
            console.log(e);
        }
    }

    const getActorsMovie = async () => {
        try {
            const APIURL = import.meta.env.VITE_URL_API;
            const response = await axios.get(`${APIURL}/movies/${id}/actors`)
            setActors(response.data.data.actors);
        } catch (e) {
            console.log(e);
        }
    }

    const handleOpenDialogTrailer = () => {
        setOpenDialogTrailer(!openDialogTrailer);
    }

    useEffect(() => {
        getMovieByID();
        getGenresMovie();
        getDirectorsMovie();
        getActorsMovie();
    }, []);


    return (
        <div>
            <div
                className="absolute w-full h-1/2 z-0 flex justify-center bg-primaryColor bg-opacity-40 blur-3xl">
                <img src={movie?.poster_url} alt={movie?.title} className="h-full sm:w-1/4 opacity-70 "
                     draggable={false}/>
            </div>
            <div className="flex flex-col items-center pb-10 z-50">
                <div className="flex flex-col items-center justify-center mt-5 z-40">
                    <img src={movie?.poster_url} alt={movie?.title} className="h-80 w-52 rounded-md z-50"
                         draggable={false}/>
                    <div className="flex gap-1">
                        {genres?.map(genre => <Link className="mt-2" to={`/genres/${genre.genre_id}`}>
                            <div
                                className="bg-primaryColor text-white rounded-2xl text-sm py-1 px-2">{genre.name}
                            </div>
                        </Link>)
                        }
                    </div>
                    <span
                        className="text-2xl font-bold mt-2 text-center">{movie?.title} ({movie?.release_date.split("-")[0]})</span>
                    <button onClick={handleOpenDialogTrailer}
                            className="mt-2 px-2 py-1 border flex items-center justify-center shadow-2xl hover:bg-primaryColor hover:text-white">
                        <PlayArrowOutlined/> Play Trailer
                    </button>

                    <Dialog
                        open={openDialogTrailer}
                        keepMounted
                        onClose={handleOpenDialogTrailer}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{movie?.title} - Trailer</DialogTitle>
                        <DialogContent>
                            <ReactPlayer
                                url={movie?.trailer_url}
                                width={500}
                                playing={openDialogTrailer}
                                light={true}
                                controls={true}
                                config={{
                                    youtube: {
                                        playerVars: {showinfo: 1}
                                    },
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="w-full sm:w-3/4 mt-10">
                    <div className="px-5 mt-5">
                        <div className="text-xl font-bold">Overview</div>
                        <div className="text-justify mt-2">{movie?.plot}</div>
                    </div>
                    <div className="px-5 mt-5">
                        <div className="text-xl font-bold">Directors</div>
                        <div>{directors?.map(director => <div>{director.name}</div>) ?? '-'}</div>
                    </div>
                    <div className="px-5 mt-5">
                        <div className="text-xl font-bold">Actors</div>
                        <div className="text-justify mt-2">{actors?.map(actor => <div>{actor.name} | <b>{actor.role}</b></div>) ?? '-'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;