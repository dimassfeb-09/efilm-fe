import AdminNavBar from "./Admin.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import ShowDialogAddDirector from "../components/ShowDialogAddDirector.tsx";
import {useCookies} from "react-cookie";
import showToast from "../components/toast.tsx";
import ShowDialogAddDirectorToMovie from "../components/ShowDialogAddDirectorToMovie.tsx";

const AdminDirector = () => {

    const [openAddDirector, setOpenAddDirector] = useState<boolean>(false);
    const [openAddDirectorToMovie, setOpenAddDirectorToMovie] = useState<boolean>(false);

    const [directors, setDirectors] = useState<DirectorsType[] | null>(null);
    const [director, setDirector] = useState<DirectorsType | null>(null);

    const [cookie,] = useCookies(['access_token'])
    const APIURL = import.meta.env.VITE_URL_API;



    const fetchDataDirectors = async () => {
        try {
            const res = await axios.get(`${APIURL}/directors`);
            const statusCode = res.data.code;
            if (statusCode == 200) {
                setDirectors(res.data.data)
            }
        } catch (e) {
            console.log(e);
        }
    }


    const handleUpdateDataDirectors = ()=> {
        fetchDataDirectors();
    }

    useEffect(() => {
        fetchDataDirectors();
    }, []);

        const handleSubmitAddDirector = async () => {
            try {

                if (director?.nationality_id == undefined) {
                    throw Error("National cannot be empty, please select");
                }

                const res = await axios.post(`${APIURL}/directors`, director, {
                        headers: {
                            'Authorization': `Bearer ${cookie.access_token}`
                        }
                    }
                )

                const statusCode = res.data.code;
                if (statusCode >= 200 && statusCode < 400) {
                    setDirectors(res.data.data)
                    fetchDataDirectors();
                    handleCloseAddDirector()
                    showToast(true, "Success created directors")
                }
            } catch (e) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                showToast(false, String(e.response.data.message))
            }
        }

        const handleCloseAddDirector = () => {
            setOpenAddDirector(false);
        }

    const handleCloseAddDirectorToMovie = () => {
        setOpenAddDirectorToMovie(false);
    }



        return <div className="w-full flex justify-center">
            <div className="w-full">
                <AdminNavBar/>
                <ShowDialogAddDirector
                    director={director}
                    handleClose={handleCloseAddDirector}
                    handleSubmit={handleSubmitAddDirector}
                    open={openAddDirector}
                    setDirector={setDirector}
                />
                <ShowDialogAddDirectorToMovie
                    directors={directors}
                    handleClose={handleCloseAddDirectorToMovie}
                    handleUpdateData={handleUpdateDataDirectors}
                    open={openAddDirectorToMovie}
                />
                <div className="flex">
                    <button
                        onClick={() => setOpenAddDirector(true)}
                        className="flex items-center ml-5 my-3 justify-center w-1/2 px-5 py-2 text-sm
                tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>Add DIRECTOR</span>
                    </button>
                    <button
                        onClick={() => setOpenAddDirectorToMovie(true)}
                        className="flex items-center mx-5 my-3 justify-center w-1/2 px-5 py-2 text-sm
                tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>Add DIRECTOR TO MOVIE</span>
                    </button>
                </div>
                <div className="rounded-lg border border-gray-200 shadow-md m-5 overflow-x-scroll">
                    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">ID</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">NAME</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                        </thead>
                        <tbody
                            className="divide-y divide-gray-100 border-t border-gray-100  overflow-x-scroll overflow-auto">
                        {directors == null ?
                            <tr>
                                <td colSpan={5} className="px-6 py-4 whitespace-no-wrap text-center">Loading...</td>
                            </tr> : directors.map((director) => {
                                return <tr className="hover:bg-gray-50" key={director.id}>
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
                                        <div className="flex justify-end gap-4">
                                            <button>
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
                                            <button>
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