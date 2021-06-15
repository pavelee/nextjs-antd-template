import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = (defaultAxiosParams) => {
    const [axiosParams, setAxiosParams] = useState({});
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const request = async (params) => {
        params = Object.assign({}, axiosParams, params);
        setLoading(true);
        try {
            const result = await axios.request(params);
            setResponse(result.data);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        //fetchData(axiosParams);
        setAxiosParams(defaultAxiosParams);
    }, []);

    return {
        request,
        response,
        error,
        loading
    }
}
