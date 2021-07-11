import { useState, useEffect } from "react";

export const useToken = (props = {}) => {
    const { storageType = "localStorage", defaultStorageKey = "token" } = props;
    const [token, setToken] = useState(undefined);

    useEffect(() => {
        switch (storageType) {
            case "localStorage":
                let t = getTokenFromLocalStorage(defaultStorageKey);
                if (t) {
                    setToken(t);
                } else {
                    setToken(null);
                }
                break;
            default:
                throw Error(`${storageType} is not supported`);
        }
    }, []);

    useEffect(() => {
        switch (storageType) {
            case "localStorage":
                setTokenInLocalStorage(token, defaultStorageKey);
                break;
            default:
                throw Error(`${storageType} is not supported`);
        }
    }, [token]);

    const getTokenFromLocalStorage = (key = "token") => {
        let token = window.localStorage.getItem(key);
        if (validateToken(token) === false) {
            return null;
        }
        return token;
    };

    const setTokenInLocalStorage = (token, key = "token") => {
        window.localStorage.setItem(key, token);
    };

    const validateToken = (token) => {
        return !(token === 'null' || token === 'undefined' || (token && token.length <= 0))
    }

    return {
        token,
        setToken,
    };
};
