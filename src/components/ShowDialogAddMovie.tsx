import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

import showToast from "./toast.tsx";
import Select from "react-select";

type propsShowDialog = {
    movie: MoviesType | null;
    setMovie: Dispatch<SetStateAction<MoviesType | null>>;
    open: boolean;
    handleClose: () => void;
    handleUpdateData: ()=> void;
}


interface Option {
    key: number;
    label: string;
    value: string;
}

const ShowDialogAddMovie = (props: propsShowDialog) => {

    const [title, setTitle] = useState<string | null>(null);
    const [releaseDate, setReleaseDate] = useState<string | null>(null);
    const [duration, setDuration] = useState<string | null>(null);
    const [plot, setPlot] = useState<string | null>(null);
    const [posterUrl, setPosterUrl] = useState<string | null>(null);
    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
    const [language, setLanguage] = useState<string | null>(null);
    const [genreIds, setGenreIds] = useState<number[] | null>(null);

    const [options, setOptions] = useState<Option[]>([]);
    const [cookie,] = useCookies(['access_token'])

    const APIURL = import.meta.env.VITE_URL_API;

    const handleSubmit = async () => {
        try {
            const data = {
                title: props.movie?.title,
                release_date: props.movie?.release_date,
                duration: Number(props.movie?.duration),
                plot: props.movie?.plot,
                poster_url: props.movie?.poster_url,
                trailer_url: props.movie?.trailer_url,
                language: props.movie?.language,
                genre_ids: props.movie?.genre_ids,
            };

            const res = await axios.post(`${APIURL}/movies`, data, {
                    headers: {
                        'Authorization': `Bearer ${cookie.access_token}`
                    }
                }
            )

            const statusCode = res.data.code;
            if (statusCode >= 200 && statusCode < 400) {
                showToast(true, 'Successfully add movies')
                handleClose();
                props.handleUpdateData();
            }

        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // showToast(false, String(e.response.data.message));
            console.log(e);
        }
    }

    const handleClose = () => {
        props.handleClose();
        props.setMovie(null);
    }

    const fetchDataGenres = async () => {
        await axios.get(`${APIURL}/genres`).then((res) => {
            const dataGenre = res.data.data;
            const opts = dataGenre.map((genre: { id: number, name: string, value: string }): Option => {
                return {key: genre.id, label: genre.name, value: genre.name}
            })
            setOptions(opts);
        });
    };

    useEffect(() => {
        fetchDataGenres();
    }, []);

    useEffect(() => {
        props.setMovie({
            title: title ?? '',
            release_date: releaseDate ?? '',
            duration: duration ?? '',
            plot: plot ?? '',
            poster_url: posterUrl ?? '',
            trailer_url: trailerUrl ?? '',
            language: language ?? '',
            genre_ids: genreIds ?? null,
        })
    }, [title, releaseDate, duration, plot, posterUrl, trailerUrl, language, genreIds]);

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Add Data Movie</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to add movie data
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={props.movie?.title ?? ''}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="release_date"
                    label="Release Date (yyyy-mm-dd)"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={props.movie?.release_date ?? ''}
                    onChange={(e) => setReleaseDate(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="duration"
                    label="Duration (in minutes)"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={props.movie?.duration ?? 0}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <TextField
                    id="plot"
                    multiline
                    autoFocus
                    margin="dense"
                    label="Plot"
                    type="text"
                    rows={5}
                    variant="standard"
                    value={props.movie?.plot ?? ''}
                    onChange={(e) => setPlot(e.target.value)}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="poster_url"
                    label="Poster URL (Address with extention .png .jpg .jpeg)"
                    placeholder="https://asianwiki.com/images/e/ec/Moving-MP1.jpeg"
                    type="text"
                    fullWidth
                    value={props.movie?.poster_url ?? ''}
                    variant="standard"
                    onChange={(e) => setPosterUrl(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="trailer_url"
                    label="Trailer URL (URL YT)"
                    placeholder="https://www.youtube.com/watch?v=UVYw3biOgyE&ab_channel=Hulu"
                    type="text"
                    fullWidth
                    value={props.movie?.trailer_url ?? ''}
                    variant="standard"
                    onChange={(e) => setTrailerUrl(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="language"
                    label="Language"
                    placeholder="Korean"
                    type="text"
                    fullWidth
                    value={props.movie?.language ?? ''}
                    variant="standard"
                    onChange={(e) => setLanguage(e.target.value)}
                />
                <Select
                    isMulti
                    name="colors"
                    options={options}
                    className="basic-multi-select mt-5 mb-52"
                    classNamePrefix="select"
                    hideSelectedOptions={true}
                    onChange={(select) => {
                        setGenreIds(select.map((value) => value.key));
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CANCEL</Button>
                <Button onClick={handleSubmit}>SUBMIT</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShowDialogAddMovie;