// api.js
import axios from 'axios';
import {useCookies} from "react-cookie";
import {APIURL} from "../constant/constant.ts";

export async function VerifyJWT() : Promise<boolean> {
    const [cookie,] = useCookies(['access_token'])
    try {
        const response = await axios.post(`${APIURL}/users/info`, null, {
            headers: {
                'Authorization': `Bearer ${cookie.access_token}`,
            },
        });

        return response.status === 200;
    } catch (error) {
        return false;
    }
}
