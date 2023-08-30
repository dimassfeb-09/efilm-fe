import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import showToast from "./toast.tsx";
import {useCookies} from "react-cookie";
import {APIURL} from "../constant/constant.ts";

type propsShowDialog = {
    actor: ActorsType | null;
    open: boolean;
    handleClose: () => void;
    handleUpdateData:  ()=> void;
}

const ShowDialogDeleteActor = (props: propsShowDialog) => {

    const [id, setID] = useState<number | null>(null);
    const [name, setName] = useState<string | null>(null);

    const [loading, setLoading]= useState<boolean>(false);
    const [cookie,] = useCookies(['access_token'])

    const handleSubmitDeleteActor = async () => {
        try {
            const res = await axios.delete(`${APIURL}/actors/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${cookie.access_token}`
                    }
                }
            )
            const statusCode = res.data.code;
            if (statusCode >= 200 && statusCode < 400) {
                showToast(true, 'Successfully delete actor');
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
        handleSubmitDeleteActor()
        setTimeout(()=> {
            setLoading(false);
        }, 1000)
        props.handleUpdateData();
    }


    useEffect(() => {
        setID(props.actor?.actorId ?? 0);
        setName(props.actor?.name ?? '');
    }, [props.actor]);

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Delete Data Actor <b>{name}</b></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to delete actor data <b>{name}</b>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>CANCEL</Button>
                <Button onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShowDialogDeleteActor;