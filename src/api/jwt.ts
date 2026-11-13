// api.js
import axios from 'axios';
import {APIURL} from "../constant/constant.ts";

export async function VerifyJWT(token: string | undefined) : Promise<boolean> {
    try {
        const response = await axios.post(`${APIURL}/users/info`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.status === 200;
    } catch (error) {
        return false;
    }
}