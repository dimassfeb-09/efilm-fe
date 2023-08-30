import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ChangeEvent,useEffect, useState} from "react";
import dayjs, { Dayjs } from 'dayjs';
import axios from "axios";
import {useCookies} from "react-cookie";
import {APIURL} from "../constant/constant.ts";
import Select from "react-select";
import showToast from "./toast.tsx";
import {DatePicker} from "@mui/x-date-pickers";

type propsShowDialog = {
    open: boolean;
    handleClose: () => void;
    handleUpdateData: ()=> void;
}

const ShowDialogAddMovie = (props: propsShowDialog) => {

    const [title, setTitle] = useState<string | null>(null);
    const [releaseDate, setReleaseDate] = useState<string | null>(null);
    const [duration, setDuration] = useState<string | null>(null);
    const [plot, setPlot] = useState<string | null>(null);
    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
    const [language, setLanguage] = useState<string | null>(null);
    const [genreIds, setGenreIds] = useState<number[] | null>(null);
    const [posterFileSelected, setPosterFileSelected] = useState<File | null>(null);

    const [options, setOptions] = useState<OptionType[]>([]);
    const [cookie,] = useCookies(['access_token'])


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

    const handleSubmitAddMovie = async () => {
        try {
            const data = {
                title: title,
                release_date: releaseDate,
                duration: Number(duration),
                plot: plot,
                trailer_url: trailerUrl,
                language: language,
                genre_ids: genreIds,
            };

            const res = await axios.post(`${APIURL}/movies`, data, {
                    headers: {
                        'Authorization': `Bearer ${cookie.access_token}`
                    }
                }
            )
            return res.data;
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false,e.response.data.message);
        }
    }

    const handleUploadPoster = async (movieID: number)=> {
        try {
            const res = await axios.post(`${APIURL}/movies/${movieID}/upload_poster`, {
                poster_file: posterFileSelected
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${cookie.access_token}`,
                }
            })
            return res;
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false,e.response.data.message);
        }
    }

    const handleSubmit = async ()=> {

        const isInputCompleted = validateInput();
        if (!isInputCompleted) {
            return;
        }

        try {
            const res = await handleSubmitAddMovie();

            if (res.code == 200) {
                await handleUploadPoster(res.data.movie_id);
            }

            props.handleUpdateData();
            handleClose();
            showToast(true, "Success added new movie");

        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false,e.response.data.message);
        }
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

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>)=> {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setPosterFileSelected(file);
        }
    }

    useEffect(() => {
        fetchDataGenres();
    }, []);

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

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Add Data Movie</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to add movie data
                </DialogContentText>

                <label className="block mt-5">
                    <span>Choose poster photo</span>
                    <input
                        type="file"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={handleSelectFile}
                    />
                    <span className="text-xs">Only accept .png .jpg .jpeg</span>
                </label>

                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={title ?? ''}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="mt-5 mb-3">
                    <DatePicker
                        label="Release Date"
                        className="w-full"
                        value={dayjs(releaseDate ?? Date())}
                        format="YYYY-MM-DD"
                        onChange={(e)=> {
                            if (e != null) {
                                setReleaseDate(e.format('YYYY-MM-DD'))
                            }
                        }}
                    />
                </div>
                <TextField
                    autoFocus
                    margin="dense"
                    id="duration"
                    label="Duration (in minutes)"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={duration ?? 0}
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
                    value={plot ?? ''}
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
                    value={trailerUrl ?? ''}
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
                    value={language ?? ''}
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