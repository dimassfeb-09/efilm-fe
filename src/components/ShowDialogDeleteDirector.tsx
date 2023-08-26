import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { useState} from "react";
import axios from "axios";
import showToast from "./toast.tsx";
import {useCookies} from "react-cookie";

type propsShowDialog = {
    director: DirectorsType | null;
    open: boolean;
    handleClose: () => void;
    handleUpdateData:  ()=> void;
}

const ShowDialogDeleteDirector = (props: propsShowDialog) => {

    const [loading, setLoading]= useState<boolean>(false);

    const [cookie,] = useCookies(['access_token'])

    const handleSubmitdeleteData = async () => {
        try {
            const APIURL = import.meta.env.VITE_URL_API;
            const res = await axios.delete(`${APIURL}/directors/${props.director?.id}`, {
                    headers: {
                        'Authorization': `Bearer ${cookie.access_token}`
                    }
                }
            )

            const statusCode = res.data.code;
            if (statusCode >= 200 && statusCode < 400) {
                props.handleClose();
                showToast(true, 'Successfully delete director')
            }

        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false, String(e.response.data.message));
        }
    }

    const handleSubmit = ()=> {
        setLoading(true);
        handleSubmitdeleteData()
        setTimeout(()=> {
            setLoading(false);
        }, 1000)
        props.handleUpdateData();
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Delete Data Genre {props.director?.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to delete director data {props.director?.name}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>CANCEL</Button>
                <Button onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShowDialogDeleteDirector;