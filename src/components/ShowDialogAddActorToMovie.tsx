import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import { useEffect, useState} from "react";
import Select from "react-select";
import axios from "axios";
import {useCookies} from "react-cookie";
import showToast from "./toast.tsx";
import {APIURL} from "../constant/constant.ts";


type propsShowDialog = {
    open: boolean;
    actors: ActorsType[] | null;
    handleClose: () => void;
    handleUpdateData: ()=> void;
}


const ShowDialogAddActorToMovie = (props: propsShowDialog) => {

    const [role, setRole] = useState<string | null>(null);
    const [actorSelected, setActorSelected] = useState<number>(0);
    const [moviesSelected, setMovieSelected] = useState<number>(0);

    const [loading, setLoading]= useState<boolean>(false);

    const [optionsMovie, setOptionsMovie] = useState<OptionType[]>([]);
    const [options, setOptions] = useState<OptionType[]>([]);

    const [cookie,] = useCookies(['access_token'])

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
        if (props.actors) {
            const actors: ActorsType[] = props.actors?.map((actor: ActorsType) : ActorsType=> {
                return actor;
            });
            setOptions(actors.map((actor)=> {
                return {key: actor.actorId ?? 0, label: actor.name, value: actor.name}
            }))
        }
    }, [props.actors]);

    const insertDataActorToMovie = async ()=> {
        try {
            const res = await axios.post(`${APIURL}/movies/${moviesSelected}/actors`, {
                    role: role,
                    actor_id: actorSelected,
                }, {
                    headers: {
                        'Authorization': `Bearer ${cookie.access_token}`
                    }
                }
            )
            const statusCode = res.data.code;
            if (statusCode >= 200 && statusCode < 400) {
                handleClose();
                props.handleUpdateData();
                showToast(true, "Success added actor to movie")
            }
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false, String(e.response.data.message))
        }
    }


    const handleSubmit = ()=> {
        setLoading(true);
        insertDataActorToMovie();
        props.handleUpdateData();
        setTimeout(()=> {
            setLoading(false);
        }, 1000);
    }

    const handleClose = ()=> {
        setRole(null);
        setActorSelected(0);
        setMovieSelected(0);
        props.handleClose();
    }


    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Add Data Actor</DialogTitle>
            <DialogContent>
                <DialogContentText >
                    This form is used to add actor data
                </DialogContentText>

                <div className="mt-5">
                    <TextField
                        id="role"
                        name="role"
                        label="Name in the movie"
                        variant="outlined"
                        required={true}
                        size="small"
                        value={role ?? ''}
                        onChange={(e)=>setRole(e.target.value)}
                        fullWidth
                    />
                </div>



                <Select
                    name="actor"
                    placeholder="Actor"
                    options={options}
                    className="basic-multi-select mt-5"
                    classNamePrefix="select"
                    isSearchable={true}
                    onChange={(select) => {
                        if (select != null) {
                            setActorSelected(select.key)
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

export default ShowDialogAddActorToMovie;