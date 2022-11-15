import { cathError, getToken } from "../utils/helper";
import client from "./client";

export const createActor = async (formData) => {
    const token = getToken()
    try {
        const { data } = await client.post("/actor/create", formData, {
            headers: {
                authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (error) {
        return cathError(error)
    }
};

export const searchActor = async (query) => {
    const token = getToken()
    try {
        const { data } = await client(`/actor/search?name=${query}`, {
            headers: {
                authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (error) {
        return cathError(error)
    }
};