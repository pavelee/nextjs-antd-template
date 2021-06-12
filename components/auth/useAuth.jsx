import { useState, useEffect } from "react";

export const useAuth = (params) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(undefined);

    const { username, password, correctToken } = params;

    useEffect(() => {
        let storedToken = getStoredToken();
        if (storedToken) {
            setToken(storedToken);
        } else {
            setToken(null);
        }
    }, []);

    useEffect(() => {
        if (token) {
            setStoredToken(token);
            if (checkIfAuthorized(token)) {
                setUser(getUserFromToken(token));
            }
        } else {
            setStoredToken('');
            setUser(null);
        }
    }, [token]);

    const loginHandler = (u, p) => {
        if (u === username && p === password) {
            setToken(correctToken);
            return true;
        }
        return false;
    };

    const logoutHandler = () => {
        setToken(null);
    }

    const getStoredToken = () => {
        return window.localStorage.getItem("token");
    };

    const setStoredToken = (token, key = "token") => {
        window.localStorage.setItem(key, token);
    };

    const checkIfAuthorized = (token) => {
        return token === correctToken;
    };

    const getUserFromToken = (token) => {
        return {
            login: "pciosek",
            name: "Paweł Ciosek",
        };
    };

    return {
        loginHandler,
        token,
        user,
    };
};
