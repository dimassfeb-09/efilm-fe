import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {Dispatch, SetStateAction, useEffect, useState} from "react";


type propsShowDialog = {
    genre: GenresType | null;
    setGenre: Dispatch<SetStateAction<GenresType | null>>;
    open: boolean;
    handleClose: () => void;
    handleSubmit:  ()=> void;
}

const ShowDialogUpdateGenre = (props: propsShowDialog) => {

    const [name, setName] = useState<string | null>(null);
    const [loading, setLoading]= useState<boolean>(false);

    const handleSubmit = ()=> {
        setLoading(true);
        props.handleSubmit();
        setTimeout(()=> {
            setLoading(false);
        }, 1000)
    }

    useEffect(() => {
        props.setGenre({
            genre_id: props.genre?.genre_id,
            name: name ?? '',
        })
    }, [name]);

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Update Data Genre {props.genre?.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to update genre data
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={props.genre?.name ?? ''}
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