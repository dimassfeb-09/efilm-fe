import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import axios from "axios";
import showToast from "./toast.tsx";
import {useCookies} from "react-cookie";
import {APIURL} from "../constant/constant.ts";
import {useEffect, useState} from "react";

type propsShowDialog = {
    movie: MoviesType | null;
    open: boolean;
    handleClose: () => void;
}

const ShowDialogDeleteMovie = (props: propsShowDialog) => {

    const [id, setID] = useState<number | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [cookie,] = useCookies(['access_token'])

    const handleSubmit = async () => {
        try {
            await axios.delete(`${APIURL}/movies/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${cookie.access_token}`
                    }
                }
            )
            showToast(true, 'Successfully delete movies')
            props.handleClose();
            window.location.reload();
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false, String(e.response.data.message));
        }
    }

    useEffect(() => {
        setID(props.movie?.id ?? 0);
        setTitle(props.movie?.title ?? null);
    }, [props.movie]);

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Delete Movie <b>{title}</b>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure to delete data?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} autoFocus>
                    Delete now
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShowDialogDeleteMovie;