import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import showToast from "./toast.tsx";
import {useCookies} from "react-cookie";
import {APIURL} from "../constant/constant.ts";


type propsShowDialog = {
    genre: GenresType | null;
    open: boolean;
    handleClose: () => void;
    handleUpdateData:  ()=> void;
}

const ShowDialogUpdateGenre = (props: propsShowDialog) => {

    const [id, setID] = useState<number | null>(null);
    const [name, setName] = useState<string | null>(null);

    const [loading, setLoading]= useState<boolean>(false);
    const [cookie,] = useCookies(['access_token'])

    const handleSubmitUpdate = async () => {
        try {
            const res = await axios.put(`${APIURL}/genres/${id}`, {
                    name: name
                }, {
                    headers: {
                        'Authorization': `Bearer ${cookie.access_token}`
                    }
                }
            )
            const statusCode = res.data.code;
            if (statusCode >= 200 && statusCode < 400) {
                showToast(true, 'Successfully update genres')
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
        handleSubmitUpdate();
        setTimeout(()=> {
            setLoading(false);
        }, 1000)
    }

    useEffect(() => {
        setID(props.genre?.genre_id ?? 0);
        setName(props.genre?.name ?? '');
    }, [props.genre]);

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Update Data Genre <b>{props.genre?.name}</b></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to update genre data <b>{props.genre?.name}</b>
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name ?? ''}
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>CANCEL</Button>
                <Button onClick={handleSubmit} disabled={loading}>{!loading ? 'SUBMIT': 'LOADING...'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShowDialogUpdateGenre;