import axios from "axios";
import Axiosinstance from "./interceptors";

const url = 'https://nativeserver-phi.vercel.app';

export const userSignIn = async (data: any) => {
    const response = await Axiosinstance.post(`${url}/user/signin`, data);
    return response
}