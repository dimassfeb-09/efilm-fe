import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {APIURL} from "../constant/constant.ts";
import Select from "react-select";
import showToast from "./toast.tsx";
import {useCookies} from "react-cookie";

type propsShowDialog = {
    movie: MoviesType | null;
    open: boolean;
    handleClose: () => void;
    handleUpdateData: ()=> void;
}

const ShowDialogUpdateMovie = (props: propsShowDialog) => {

    const [id, setID] = useState<number | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [releaseDate, setReleaseDate] = useState<string | null>(null);
    const [duration, setDuration] = useState<number | null>(null);
    const [plot, setPlot] = useState<string | null>(null);
    const [posterUrl, setPosterUrl] = useState<string | null>(null);
    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
    const [language, setLanguage] = useState<string | null>(null);
    const [genreIds, setGenreIds] = useState<number[] | null>(null);

    const [selected, setSelected] = useState<OptionType[]>([]);
    const [options, setOptions] = useState<OptionType[]>([]);

    const [cookie,] = useCookies(['access_token'])
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

    const handleSubmitUpdate = async () => {
        try {
            const data = {
                title: title,
                release_date: releaseDate,
                duration: duration,
                plot: plot,
                poster_url: posterUrl,
                trailer_url: trailerUrl,
                language: language,
                genre_ids: genreIds,
            };

            const res = await axios.put(`${APIURL}/movies/${id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${cookie.access_token}`
                    }
                }
            )

            const statusCode = res.data.code;
            if (statusCode >= 200 && statusCode < 400) {
                showToast(true, 'Successfully update movies')
                props.handleClose();
                props.handleUpdateData();
            }

        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false, String(e.response.data.message));
        }
    }

    const handleSubmit = ()=> {
        setLoading(true);
        handleSubmitUpdate()
        setTimeout(()=> {
            setLoading(false);
        }, 1000)
    }

    useEffect(() => {
        fetchDataGenres();
    }, []);

    useEffect(() => {
        const movie = props.movie;
        setID(movie?.id ?? 0)
        setTitle(movie?.title ?? '')
        setReleaseDate(movie?.release_date ?? '0000-00-00')
        setDuration(Number(movie?.duration) ?? 0)
        setPlot(movie?.plot ?? '')
        setPosterUrl(movie?.poster_url ?? '')
        setTrailerUrl(movie?.trailer_url ?? '')
        setLanguage(movie?.language ?? '')
        setGenreIds(movie?.genre_ids ?? null);
    }, [props.movie]);

    useEffect(() => {
        const filteredOptions = options.filter(option => genreIds?.includes(option.key));
        setSelected(filteredOptions)
    }, [props.movie, genreIds, options]);

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Update Data Movie <b>{props.movie?.title}</b></DialogTitle>
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
                    value={title}
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
                    value={releaseDate}
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
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
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
                    value={plot}
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
                    value={posterUrl}
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
                    value={trailerUrl}
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
                    value={language}
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
                    onChange={(select) => setGenreIds(select.map(select=>select.key))}
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