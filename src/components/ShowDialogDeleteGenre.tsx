import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
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

const ShowDialogDeleteGenre = (props: propsShowDialog) => {

    const [id, setID] = useState<number | null>(null);
    const [name, setName] = useState<string | null>(null);

    const [loading, setLoading]= useState<boolean>(false);
    const [cookie,] = useCookies(['access_token'])

    const handleSubmitDeleteGenre = async () => {
        try {
            const res = await axios.delete(`${APIURL}/genres/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${cookie.access_token}`
                    }
                }
            )
            const statusCode = res.data.code;
            if (statusCode >= 200 && statusCode < 400) {
                showToast(true, 'Successfully deleted genre')
                props.handleClose();
                props.handleUpdateData()
            }
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (String(e.response.data.message).includes("foreign key")) {
                showToast(false, "Cannot delete data due to a foreign key constraint.");
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                showToast(false, String(e.response.data.message));
            }
            props.handleClose();
        }
    }


    const handleSubmit = ()=> {
        setLoading(true);
        handleSubmitDeleteGenre();
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
            <DialogTitle>Delete Data Genre {name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to delete genre data <b>{name}</b>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>CANCEL</Button>
                <Button onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShowDialogDeleteGenre;