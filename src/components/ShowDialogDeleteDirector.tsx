import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import showToast from "./toast.tsx";
import {useCookies} from "react-cookie";
import {APIURL} from "../constant/constant.ts";

type propsShowDialog = {
    director: DirectorsType | null;
    open: boolean;
    handleClose: () => void;
    handleUpdateData:  ()=> void;
}

const ShowDialogDeleteDirector = (props: propsShowDialog) => {

    const [id, setID] = useState<number | null>(null);
    const [name, setName] = useState<string | null>(null);

    const [loading, setLoading]= useState<boolean>(false);
    const [cookie,] = useCookies(['access_token'])

    const handleSubmitDeleteDirector = async () => {
        try {
            const res = await axios.delete(`${APIURL}/directors/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${cookie.access_token}`
                    }
                }
            )
            const statusCode = res.data.code;
            if (statusCode >= 200 && statusCode < 400) {
                showToast(true, 'Successfully delete director');
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
        handleSubmitDeleteDirector()
        setTimeout(()=> {
            setLoading(false);
        }, 1000)
        props.handleUpdateData();
    }


    useEffect(() => {
        setID(props.director?.id ?? 0);
        setName(props.director?.name ?? '');
    }, [props.director]);

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Delete Data Director <b>{name}</b></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to delete director data <b>{name}</b>
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