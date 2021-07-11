import { useState, useEffect } from "react";
import { useAxios } from "../../../request/useAxios";
import { useToken } from "../../useToken";

export const useAuth = (params) => {
    const {
        authUrl
    } = params;
    const { token, setToken } = useToken();

    const { request, response, error, loading } = useAxios();

    useEffect(() => {
        if (response && response.token) {
            setToken(response.token);
        }
    }, [response]);

    const loginHandler = (username, password) => {
        request({
            url: authUrl,
            method: "POST",
            data: {
                username,
                password,
            },
        });
    };

    const logoutHandler = () => {
        setToken(null);
    };

    return {
        token,
        error,
        loginHandler,
        logoutHandler,
    };
};
