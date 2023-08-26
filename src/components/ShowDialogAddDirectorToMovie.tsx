import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { useEffect, useState} from "react";
import Select from "react-select";
import axios from "axios";
import {useCookies} from "react-cookie";
import showToast from "./toast.tsx";


type propsShowDialog = {
    open: boolean;
    directors: DirectorsType[] | null;
    handleClose: () => void;
    handleUpdateData: ()=> void;
}

interface Option {
    key: number;
    label: string;
    value: string;
}

const ShowDialogAddDirectorToMovie = (props: propsShowDialog) => {

    const [directorSelected, setDirectorSelected] = useState<number>(0);
    const [moviesSelected, setMovieSelected] = useState<number>(0);

    const [loading, setLoading]= useState<boolean>(false);

    const [optionsMovie, setOptionsMovie] = useState<Option[]>([]);
    const [optionsDirector, setOptionsDirector] = useState<Option[]>([]);

    const [cookie,] = useCookies(['access_token'])
    const APIURL = import.meta.env.VITE_URL_API;

    useEffect(() => {
        const fetchDataMovies = async ()=> {
            try {
                const res = await axios.get(`${APIURL}/movies`)
                const movies: MoviesType[] =res.data.data.map((movie: MoviesType) : MoviesType=> {
                    return movie;
                });
                setOptionsMovie(movies.map((movie)=> {
                    return {key: movie.id ?? 0, label: movie.title, value: movie.title}
                }))
            } catch (e) {
                console.log(e);
            }
        }
        fetchDataMovies()
    }, []);

    useEffect(() => {
        if (props.directors) {
            const directors: DirectorsType[] = props.directors?.map((director: DirectorsType) : DirectorsType=> {
                return director;
            });
            setOptionsDirector(directors.map((director)=> {
                return {key: director.id!, label: director.name, value: director.name}
            }))
        }
    }, [props.directors]);

    const handleSubmit = ()=> {
        setLoading(true);
        insertDataDirectorToMovie();
        props.handleUpdateData();
        setTimeout(()=> {
            setLoading(false);
        }, 1000);
    }

    const insertDataDirectorToMovie = async ()=> {
        try {
            const res = await axios.post(`${APIURL}/movies/${moviesSelected}/directors`, {
                    director_id:directorSelected,
                }, {
                    headers: {
                        'Authorization': `Bearer ${cookie.access_token}`
                    }
                }
            )
            const statusCode = res.data.code;
            if (statusCode >= 200 && statusCode < 400) {
                props.handleClose();
                showToast(true, "Success added director to movie")
            }
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false, String(e.response.data.message))
        }
    }

    const handleClose = ()=> {
        setMovieSelected(0);
        setDirectorSelected(0);
        props.handleClose();
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Add Data Director</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to add director data
                </DialogContentText>

                <Select
                    name="director"
                    placeholder="Director"
                    options={optionsDirector}
                    className="basic-multi-select mt-5"
                    classNamePrefix="select"
                    isSearchable={true}
                    onChange={(select) => {
                        if (select != null) {
                            setDirectorSelected(select.key)
                        }
                    }}
                />

                <Select
                    name="movies"
                    placeholder="Movie"
                    options={optionsMovie}
                    className="basic-multi-select mt-5 mb-56"
                    classNamePrefix="select"
                    isSearchable={true}
                    onChange={(select) => {
                        if (select != null) {
                            setMovieSelected(select.key)
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CANCEL</Button>
                <Button onClick={handleSubmit} disabled={loading}>{!loading ? 'SUBMIT': 'LOADING...'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShowDialogAddDirectorToMovie;