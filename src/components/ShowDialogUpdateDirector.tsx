import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import showToast from "./toast.tsx";
import {useCookies} from "react-cookie";
import {formattedDate} from "../helpers/formattedDate.ts";
import Select from "react-select";


type propsShowDialog = {
    director: DirectorsType | null;
    open: boolean;
    handleClose: () => void;
    handleUpdateData:  ()=> void;
}

const ShowDialogUpdateDirector = (props: propsShowDialog) => {

    const [id, setID] = useState<number | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);
    const [nationalityID, setNationalityID] = useState<number | null>(null);
    const [loading, setLoading]= useState<boolean>(false);
    const [options, setOptions] = useState<Option[]>([]);

    const [cookie,] = useCookies(['access_token'])
    const APIURL = import.meta.env.VITE_URL_API;

    const updateDataDirector = async ()=> {
        try {
            const res = await axios.put(`${APIURL}/directors/${id}`, {
                    name: name,
                    date_of_birth: dateOfBirth,
                    nationality_id: nationalityID,
                }, {
                    headers: {
                        'Authorization': `Bearer ${cookie.access_token}`
                    }
                }
            )
            const statusCode = res.data.code;
            if (statusCode >= 200 && statusCode < 400) {
                props.handleClose();
                props.handleUpdateData();
                showToast(true, "Success update director.")
            }
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false, String(e.response.data.message))
        }
    }

    const handleSubmit = ()=> {
        setLoading(true);
        updateDataDirector();
        setTimeout(()=> {
            setLoading(false);
        }, 1000);
    }

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

    useEffect(() => {
        setID(props.director?.id ?? null);
        setName(props.director?.name ?? null);
        const formatDateOfBirth = formattedDate(props.director?.date_of_birth);
        setDateOfBirth(formatDateOfBirth ?? null);
        setNationalityID(props.director?.nationality_id ?? null);
    }, [props.director]);

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Update Data Director {props.director?.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to update director data
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name ?? ''}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={dateOfBirth ?? ''}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />


                <Select
                    name="national"
                    placeholder="National"
                    options={options}
                    className="basic-multi-select mt-5 mb-56"
                    classNamePrefix="select"
                    value={options.filter((opts)=> opts.key==nationalityID)}
                    isSearchable={true}
                    onChange={(select) => {
                        if (select != null) {
                            setNationalityID(select.key)
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>CANCEL</Button>
                <Button onClick={handleSubmit} disabled={loading}>{!loading ? 'SUBMIT': 'LOADING...'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShowDialogUpdateDirector;