import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import Select from "react-select";
import axios from "axios";
import showToast from "./toast.tsx";
import {useCookies} from "react-cookie";
import {APIURL} from "../constant/constant.ts";


type propsShowDialog = {
    open: boolean;
    handleClose: () => void;
    handleUpdateData: ()=> void;
}

const ShowDialogAddActor = (props: propsShowDialog) => {

    const [name, setName] = useState<string | null>(null);
    const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);
    const [nationalityID, setNationalityID] = useState<number | null>(null);
    const [loading, setLoading]= useState<boolean>(false);

    const [options, setOptions] = useState<OptionType[]>([]);
    const [cookie,] = useCookies(['access_token'])


    const handleAddActor = async ()=> {
        try {
            const res = await axios.post(`${APIURL}/actors`, {
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
                showToast(true, 'success created actors');
                handleClose();
                props.handleUpdateData();
            }
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false, String(e.response.data.message))
        }
    }

    const handleSubmit = ()=> {
        setLoading(true);
        handleAddActor()
        setTimeout(()=> {
            setLoading(false);
        }, 1000)
    }

    const handleClose = ()=> {
        setName(null);
        setDateOfBirth(null);
        setNationalityID(null);
        props.handleClose();
    }

    useEffect(() => {
        const fetchDataNationality = async ()=> {
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
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Add Data Actor</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to add actor data
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="actor"
                    label="Actor Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name ?? ''}
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
                    value={dateOfBirth ?? ''}
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

export default ShowDialogAddActor;