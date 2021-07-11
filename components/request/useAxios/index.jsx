import { useState, useEffect } from "react";
import axios from "axios";

export const useAxios = (defaultAxiosParams) => {
    const [axiosParams, setAxiosParams] = useState({});
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const request = async (params) => {
        params = Object.assign({}, axiosParams, params);
        setError(null);
        setLoading(true);
        try {
            const result = await axios.request(params);
            setResponse(result.data);
        } catch (er) {
            if (er.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(er.response.data);
                // console.log(er.response.status);
                // console.log(er.response.headers);
                if (er.response.data.message) {
                    setError(er.response.data.message);
                } else {
                    setError(er.response.data);
                }
            } else if (er.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(er.request);
                setError("The request was made but no response was received");
            } else {
                // Something happened in setting up the request that triggered an Error
                setError(er.message);
                // console.log('Error', er.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        //fetchData(axiosParams);
        setAxiosParams(defaultAxiosParams);
    }, []);

    return {
        request,
        response,
        error,
        loading,
    };
};
