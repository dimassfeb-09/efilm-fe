import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {APIURL} from "../constant/constant.ts";
import Select from "react-select";

type propsShowDialog = {
    movie: MoviesType | null;
    setMovie: Dispatch<SetStateAction<MoviesType | null>>;
    open: boolean;
    handleClose: () => void;
    handleSubmit: ()=> void;
}


const ShowDialogUpdateMovie = (props: propsShowDialog) => {

    const [title, setTitle] = useState<string | null>(null);
    const [releaseDate, setReleaseDate] = useState<string | null>(null);
    const [duration, setDuration] = useState<string | null>(null);
    const [plot, setPlot] = useState<string | null>(null);
    const [posterUrl, setPosterUrl] = useState<string | null>(null);
    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
    const [language, setLanguage] = useState<string | null>(null);
    const [genreIds, setGenreIds] = useState<number[] | null>(null);

    const [selected, setSelected] = useState<OptionType[]>([]);
    const [options, setOptions] = useState<OptionType[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const fetchDataGenres = async () => {
        await axios.get(`${APIURL}/genres`).then((res) => {
            const dataGenre = res.data.data;
            const opts = dataGenre.map((genre: { id: number, name: string, value: string }): OptionType => {
                return {key: genre.id, label: genre.name, value: genre.name}
            })
            setOptions(opts);
        });
    };

    const handleSubmit = ()=> {
        setLoading(true);
        props.handleSubmit()
        setTimeout(()=> {
            setLoading(false);
        }, 1000)
    }

    useEffect(() => {
        fetchDataGenres();
    }, []);

    useEffect(() => {
        props.setMovie({
            id: props.movie?.id ?? 0,
            title: title ?? props.movie?.title ?? '',
            release_date: releaseDate ?? props.movie?.release_date ?? '',
            duration: duration ?? props.movie?.duration ?? '',
            plot: plot ?? props.movie?.plot ?? '',
            poster_url: posterUrl ?? props.movie?.poster_url ?? '',
            trailer_url: trailerUrl ?? props.movie?.trailer_url ?? '',
            language: language ?? props.movie?.language ?? '',
            genre_ids: genreIds ?? props.movie?.genre_ids ?? null,
        })
    }, [title, releaseDate, duration, plot, posterUrl, language, genreIds, trailerUrl]);

    useEffect(() => {
        const filteredOptions = options.filter(option => props.movie?.genre_ids?.includes(option.key));
        setSelected(filteredOptions)
    }, [genreIds,props.movie?.genre_ids]);

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
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
                    type="text"
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
                    value={selected}
                    options={options}
                    className="basic-multi-select mt-5 mb-52"
                    classNamePrefix="select"
                    hideSelectedOptions={true}
                    onChange={(select) => setGenreIds(select.map((value) => value.key))}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>CANCEL</Button>
                <Button onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...': 'SUBMIT'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShowDialogUpdateMovie;