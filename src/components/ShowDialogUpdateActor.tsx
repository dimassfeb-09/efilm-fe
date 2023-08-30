import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import showToast from "./toast.tsx";
import {useCookies} from "react-cookie";
import {formattedDate} from "../helpers/formattedDate.ts";
import Select from "react-select";
import {APIURL} from "../constant/constant.ts";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";


type propsShowDialog = {
    actor: ActorsType | null;
    open: boolean;
    handleClose: () => void;
    handleUpdateData:  ()=> void;
}


const ShowDialogUpdateActor = (props: propsShowDialog) => {

    const [id, setID] = useState<number | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);
    const [nationalityID, setNationalityID] = useState<number | null>(null);
    const [loading, setLoading]= useState<boolean>(false);
    const [options, setOptions] = useState<OptionType[]>([]);

    const [cookie,] = useCookies(['access_token'])

    const updateDataActor = async ()=> {
        try {
            const res = await axios.put(`${APIURL}/actors/${id}`, {
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
                showToast(true, "Success update actor.")
            }
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            showToast(false, String(e.response.data.message))
        }
    }

    const handleSubmit = ()=> {
        setLoading(true);
        updateDataActor();
        setTimeout(()=> {
            setLoading(false);
        }, 1000);
    }


    // getting data national
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
        setID(props.actor?.actorId ?? null);
        setName(props.actor?.name ?? null);
        const formatDateOfBirth = formattedDate(props.actor?.date_of_birth);
        setDateOfBirth(formatDateOfBirth ?? null);
        setNationalityID(props.actor?.nationality_id ?? null);
    }, [props.actor]);

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Update Data Actor <b>{props.actor?.name}</b></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This form is used to update actor data <b>{props.actor?.name}</b>
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
                
                <div className="mt-5 mb-3">
                    <DatePicker
                        label="Date Of Birth"
                        className="w-full"
                        value={dayjs(dateOfBirth ?? Date())}
                        format="YYYY-MM-DD"
                        onChange={(e)=> {
                            if (e != null) {
                                setDateOfBirth(e.format('YYYY-MM-DD'))
                            }
                        }}
                    />
                </div>


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

export default ShowDialogUpdateActor;