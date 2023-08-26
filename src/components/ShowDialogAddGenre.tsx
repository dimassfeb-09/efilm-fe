import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import showToast from "./toast.tsx";
import {useCookies} from "react-cookie";
import {APIURL} from "../constant/constant.ts";


type propsShowDialog = {
    open: boolean;
    handleClose: () => void;
    handleUpdateData:  ()=> void;
}

const ShowDialogAddGenre = (props: propsShowDialog) => {

    const [name, setName] = useState<string | null>(null);
    const [loading, setLoading]= useState<boolean>(false);
    const [cookie,] = useCookies(['access_token'])

    const handleSubmitAdd = async () => {
        try {
            const res = await axios.post(`${APIURL}/genres`, {
                    name: name
                }, {
                    headers: {
                        'Authorization': `Bearer ${cookie.access_token}`
                    }
                }
            )

            const statusCode = res.data.code;
            if (statusCode >= 200 && statusCode < 400) {
                showToast(true, 'Successfully add genres')
                props.handleClose();
                props.handleUpdateData()
            }
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false, String(e.response.data.message));
        }
    }

    const handleSubmit = ()=> {
        setLoading(true);
        handleSubmitAdd();
        setTimeout(()=> {
            setLoading(false);
        }, 1000)
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Add Data Genre</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to add genre data
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

export default ShowDialogAddGenre;