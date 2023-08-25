import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Dispatch, SetStateAction, useState} from "react";

type propsShowDialog = {
    genre: GenresType | null;
    setGenre: Dispatch<SetStateAction<GenresType | null>>;
    open: boolean;
    handleClose: () => void;
    handleSubmit:  ()=> void;
}

const ShowDialogDeleteGenre = (props: propsShowDialog) => {

    const [loading, setLoading]= useState<boolean>(false);

    const handleSubmit = ()=> {
        setLoading(true);
        props.handleSubmit();
        setTimeout(()=> {
            setLoading(false);
        }, 1000)
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Delete Data Genre {props.genre?.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to delete genre data {props.genre?.name} {props.genre?.genre_id}
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