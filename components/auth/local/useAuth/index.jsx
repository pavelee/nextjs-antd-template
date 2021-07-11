import { useState, useEffect } from "react";
import { useToken } from "../../useToken";

export const useAuth = (params) => {
    const { token, setToken } = useToken();
    const [error, setError] = useState(null);

    const { username, password, correctToken } = params;

    const loginHandler = (u, p) => {
        if (u === username && p === password) {
            setError(null);
            setToken(correctToken);
        } else {
            setToken(null);
            setError('Wrong creditensials');
        }
    };

    const logoutHandler = () => {
        setToken(null);
    }

    return {
        loginHandler,
        logoutHandler,
        token,
        error
    };
};
