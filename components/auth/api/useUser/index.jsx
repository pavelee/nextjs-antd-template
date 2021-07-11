import { useState, useEffect } from "react";
import { useAxios } from "../../../request/useAxios";

export const useUser = (props) => {
    const { token, fetchUserUrl } =
        props;
    const [user, setUser] = useState(null);

    const { request, response, error, loading } = useAxios();

    useEffect(() => {
        if (token) {
            request({
                url: fetchUserUrl,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            });
        } else {
            setUser(null);
        }
    }, [token]);

    useEffect(() => {
        if (response) {
            setUser(response);
        }
    }, [response])

    useEffect(() => {
        console.log(error);
    }, [error])

    return {
        user
    }
};
