import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Select from "react-select";
import axios from "axios";


type propsShowDialog = {
    director: DirectorsType | null;
    setDirector: Dispatch<SetStateAction<DirectorsType | null>>;
    open: boolean;
    handleClose: () => void;
    handleSubmit:  ()=> void;
}

interface Option {
    key: number;
    label: string;
    value: string;
}

const ShowDialogAddDirector = (props: propsShowDialog) => {

    const [name, setName] = useState<string | null>(null);
    const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);
    const [nationalityID, setNationalityID] = useState<number | null>(null);
    const [loading, setLoading]= useState<boolean>(false);

    const [options, setOptions] = useState<Option[]>([]);

    const handleSubmit = ()=> {
        setLoading(true);
        props.handleSubmit();
        setTimeout(()=> {
            setLoading(false);
        }, 1000)
    }

    const handleClose = ()=> {
        props.setDirector(null);
        setName(null);
        setDateOfBirth(null);
        setNationalityID(null);
        props.handleClose();
    }

    useEffect(() => {
        props.setDirector({
            date_of_birth: dateOfBirth ?? '',
            name: name ?? '',
            nationality_id: nationalityID ?? 0,
        })
    }, [name, dateOfBirth, nationalityID]);

    useEffect(() => {
        const fetchDataNationality = async ()=> {
            const APIURL = import.meta.env.VITE_URL_API;
            try {
                const res = await axios.get(`${APIURL}/nationals`)
                const nationals: National[] =res.data.data.map((national:National) : National=> {
                    return {id: national.id, name: national.name}
                });
                setOptions(nationals.map((national)=> {
                    return {key: national.id, label: national.name, value: national.name}
                }))
            } catch (e) {
                console.log(e);
            }
        }
        fetchDataNationality()
    }, []);

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Add Data Director</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to add director data
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={props.director?.name ?? ''}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="date_of_birth"
                    label="Date Of Birth (yyyy-mm-dd)"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={props.director?.date_of_birth ?? ''}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />

                <Select
                    name="national"
                    placeholder="National"
                    options={options}
                    className="basic-multi-select mt-5 mb-56"
                    classNamePrefix="select"
                    isSearchable={true}
                    onChange={(select) => {
                        if (select != null) {
                            setNationalityID(select.key)
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CANCEL</Button>
                <Button onClick={handleSubmit} disabled={loading}>{!loading ? 'SUBMIT': 'LOADING...'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShowDialogAddDirector;