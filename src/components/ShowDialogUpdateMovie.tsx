import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
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
    const [posterFileSelected, setPosterFileSelected] = useState<File | null>(null);

    const [selected, setSelected] = useState<OptionType[]>([]);
    const [options, setOptions] = useState<OptionType[]>([]);

    const [cookie,] = useCookies(['access_token'])
    const [loading, setLoading] = useState<boolean>(false);

    const validateInput = () : boolean => {
        if (title == null) {
            showToast(false, "Please attach poster photo");
            return false
        } else if (releaseDate == null) {
            showToast(false, "Release date can't be empty");
            return false
        } else if (duration == null) {
            showToast(false, "Duration can't be empty");
            return false
        } else if (plot == null) {
            showToast(false, "Plot can't be empty");
            return false
        } else if (trailerUrl == null) {
            showToast(false, "Trailer URL can't be empty");
            return false
        } else if (language == null) {
            showToast(false, "Language can't be empty");
            return false
        }
        return true;
    }

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

            return res.data;

        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false, String(e.response.data.message));
        }
    }

    const handleUploadPoster = async (movieID: number)=> {
        try {
            return await axios.post(`${APIURL}/movies/${movieID}/upload_poster`, {
                poster_file: posterFileSelected
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${cookie.access_token}`,
                }
            });
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false,e.response.data.message);
        }
    }

    const handleSubmit = async ()=> {
        const isValid = validateInput()
        if (!isValid) {
            return;
        }

        try {
            setLoading(true);
            const res = await handleSubmitUpdate();
            if (res.code == 200 && id != null && posterFileSelected != null) {
                await handleUploadPoster(id);
            }

            props.handleUpdateData();
            handleClose();
            showToast(true, "Success updated movie");
            setLoading(false);
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false,e.response.data.message);
        }
    }

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>)=> {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setPosterFileSelected(file);
        }
    }

    const handleClose = ()=> {
        props.handleClose();
        setTitle(null);
        setReleaseDate(null);
        setDuration(null);
        setPlot(null);
        setTrailerUrl(null);
        setLanguage(null);
        setGenreIds(null);
        setPosterFileSelected(null);
    }

    useEffect(() => {
        fetchDataGenres();
    }, []);

    useEffect(() => {
        setID(props.movie?.id ?? 0)
        setTitle(props.movie?.title ?? '')
        setReleaseDate(props.movie?.release_date ?? '0000-00-00')
        setDuration(Number(props.movie?.duration ?? '0') ?? 0)
        setPlot(props.movie?.plot ?? '')
        setPosterUrl(props.movie?.poster_url ?? '')
        setTrailerUrl(props.movie?.trailer_url ?? '')
        setLanguage(props.movie?.language ?? '')
        setGenreIds(props.movie?.genre_ids ?? null);
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

                <div className="mt-5">
                    <span className="text-xs">Choose poster photo <span className="text-xs text-red-500">(choose new photos if need update)</span></span>
                    <label className="block mt-2">
                        <input
                            type="file"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={handleSelectFile}
                        />
                        <span className="text-xs">Only accept .png .jpg .jpeg</span>
                    </label>
                </div>

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
                    value={releaseDate ?? ''}
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