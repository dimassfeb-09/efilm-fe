import AdminNavBar from "./Admin.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import ShowDialogUpdateMovie from "../components/ShowDialogUpdateMovie.tsx";
import ShowDialogAddMovie from "../components/ShowDialogAddMovie.tsx";
import ShowDialogDeleteMovie from "../components/ShowDialogDeleteMovie.tsx";
import {APIURL} from "../constant/constant.ts";

const AdminMovie = () => {

    const [movies, setMovies] = useState<MoviesType[] | null>(null);
    const [movie, setMovie] = useState<MoviesType | null>(null);

    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    const fetchDataMovies = async () => {
        try {
            const response = await axios.get(`${APIURL}/movies`)
            const data = response.data.data;
            const sortedMovies = [...data].sort((a, b) => b.id - a.id);
            setMovies(sortedMovies);
        } catch (e) {
            console.log(e)
        }
    }

    const handleOpenAdd = () => {
        setOpenAdd(true);
    }

    const handleOpenUpdate = (movie: MoviesType) => {
        setMovie(movie)
        setOpenUpdate(true);
    }

    const handleOpenDelete = (movie: MoviesType) => {
        setMovie(movie)
        setOpenDelete(true);
    }

    const handleUpdateData = ()=> {
        fetchDataMovies();
    }

    useEffect(() => {
        fetchDataMovies();
    }, [])

    const handleClose = ()=> {
        if (openAdd) {
            setOpenAdd(false);
        } else if (openUpdate) {
            setOpenUpdate(false);
        } else if (openDelete) {
            setOpenDelete(false);
        }
    }


    return <div className="w-full flex justify-center">
        <div className="w-full bg-white">
            <AdminNavBar/>
            <ShowDialogAddMovie
                open={openAdd}
                handleClose={handleClose}
                movie={movie}
                setMovie={setMovie}
                handleUpdateData={handleUpdateData}
            />
            <ShowDialogUpdateMovie
                open={openUpdate}
                handleClose={handleClose}
                movie={movie}
                handleUpdateData={handleUpdateData}
            />
            <ShowDialogDeleteMovie
                open={openDelete}
                handleClose={handleClose}
                movie={movie}/>
            <button
                onClick={handleOpenAdd}
                className="flex items-center mx-5 my-3 justify-center w-1/2 px-5 py-2 text-sm
                tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Add Movie</span>
            </button>
            <div className="rounded-lg border border-gray-200 shadow-md m-5 overflow-x-scroll">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">ID</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">TITLE</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">LANGUAGE</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">DURATION/MS</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">ACTION</th>
                    </tr>
                    </thead>
                    <tbody
                        className="divide-y divide-gray-100 border-t border-gray-100  overflow-x-scroll overflow-auto">
                    {movies == null ?
                        <tr>
                            <td colSpan={5} className="px-6 py-4 whitespace-no-wrap text-center">Loading...</td>
                        </tr> : movies?.map((movie) => {
                            return <tr className="hover:bg-gray-100" key={movie.id}>
                                <th className="px-6 py-4">
                                    <span
                                        className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">{movie.id}</span>
                                </th>
                                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div className="h-28 w-28">
                                        <img
                                            className="h-full w-full rounded-full object-cover object-center"
                                            src={movie.poster_url}
                                            alt=""
                                        />
                                    </div>
                                    <div className="text-sm flex flex-col justify-between">
                                        <div>
                                            <div
                                                className="font-medium text-gray-700 w-max">{movie.title}</div>
                                            <div className="text-blue-500"><a href={movie.trailer_url}
                                                                              target="_blank">Trailer</a></div>
                                        </div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    <span
                                        className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">{movie.language}</span>
                                </td>
                                <td className="px-6 py-4">{movie.duration} minutes</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-4">
                                        <button onClick={() => handleOpenDelete(movie)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleOpenUpdate(movie)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>;
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </div>;
};

export default AdminMovie;

