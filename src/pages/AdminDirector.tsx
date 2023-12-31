import AdminNavBar from "./Admin.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import ShowDialogAddDirector from "../components/ShowDialogAddDirector.tsx";
import ShowDialogAddDirectorToMovie from "../components/ShowDialogAddDirectorToMovie.tsx";
import ShowDialogDeleteDirector from "../components/ShowDialogDeleteDirector.tsx";
import ShowDialogUpdateDirector from "../components/ShowDialogUpdateDirector.tsx";

const AdminDirector = () => {

    const [openAddDirector, setOpenAddDirector] = useState<boolean>(false);
    const [openAddDirectorToMovie, setOpenAddDirectorToMovie] = useState<boolean>(false);
    const [openDeleteDirector, setOpenDeleteDirector] = useState<boolean>(false);
    const [openUpdateDirector, setOpenUpdateDirector] = useState<boolean>(false);

    const [directors, setDirectors] = useState<DirectorsType[] | null>(null);
    const [director, setDirector] = useState<DirectorsType | null>(null);

    const fetchDataDirectors = async () => {
        try {
            const APIURL = import.meta.env.VITE_URL_API;
            const res = await axios.get(`${APIURL}/directors`);
            const statusCode = res.data.code;
            if (statusCode == 200) {
                setDirectors(res.data.data)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchDataDirectors();
    }, []);

    const handleUpdateData = ()=> {
        fetchDataDirectors();
    }


    const handleOpenDialogDelete = (director: DirectorsType)=> {
        setOpenDeleteDirector(true);
        setDirector(director);
    }

    const handleOpenDialogUpdate = (director: DirectorsType)=> {
        setOpenUpdateDirector(true);
        setDirector(director);
    }

    // handle closed
    const handleClose = ()=> {
        if (openAddDirector) {
            setOpenAddDirector(false);
        } else if (openUpdateDirector) {
            setOpenUpdateDirector(false);
        } else if (openDeleteDirector) {
            setOpenDeleteDirector(false);
        } else if (openAddDirectorToMovie) {
            setOpenAddDirectorToMovie(false);
        }
    }

        return <div className="w-full flex justify-center">
            <div className="w-full">
                <AdminNavBar/>
                <ShowDialogAddDirector
                    handleClose={handleClose}
                    handleUpdateData={handleUpdateData}
                    open={openAddDirector}
                />
                <ShowDialogAddDirectorToMovie
                    directors={directors}
                    handleClose={handleClose}
                    handleUpdateData={handleUpdateData}
                    open={openAddDirectorToMovie}
                />
                <ShowDialogDeleteDirector
                    director={director}
                    handleClose={handleClose}
                    handleUpdateData={handleUpdateData}
                    open={openDeleteDirector}
                 />
                <ShowDialogUpdateDirector
                    director={director}
                    handleClose={handleClose}
                    handleUpdateData={handleUpdateData}
                    open={openUpdateDirector}
                 />
                <div className="flex">
                    <button
                        onClick={() => setOpenAddDirector(true)}
                        className="flex items-center ml-5 my-3 justify-center px-5 py-2 text-sm
                tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>Add Director</span>
                    </button>
                    <button
                        onClick={() => setOpenAddDirectorToMovie(true)}
                        className="flex items-center mx-5 my-3 justify-center px-5 py-2 text-sm
                tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>Add Director To Movie</span>
                    </button>
                </div>
                <div className="rounded-lg border border-gray-200 shadow-md m-5 overflow-x-scroll">
                    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">ID</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">NAME</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">ACTION</th>
                        </tr>
                        </thead>
                        <tbody
                            className="divide-y divide-gray-100 border-t border-gray-100  overflow-x-scroll overflow-auto">
                        {directors == null ?
                            <tr>
                                <td colSpan={5} className="px-6 py-4 whitespace-no-wrap text-center">Loading...</td>
                            </tr> : directors.map((director) => {
                                return <tr className="hover:bg-gray-100" key={director.id}>
                                    <th className="px-6 py-4">
                                    <span
                                        className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">{director.id}</span>
                                    </th>
                                    <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                        <div className="text-sm">
                                            <div className="font-medium text-gray-700">{director.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4">
                                            <button onClick={()=>handleOpenDialogDelete(director)}>
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
                                            <button onClick={()=>handleOpenDialogUpdate(director)}>
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
export default AdminDirector;