import { useState, useEffect } from "react";

export const useToken = (props = {}) => {
    const { storageType = "localStorage", defaultStorageKey = "token" } = props;
    const [token, setToken] = useState(null);

    useEffect(() => {
        switch (storageType) {
            case "localStorage":
                let t = getTokenFromLocalStorage(defaultStorageKey);
                if (t) {
                    setToken(t);
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
        return window.localStorage.getItem(key);
    };

    const setTokenInLocalStorage = (token, key = "token") => {
        window.localStorage.setItem(key, token);
    };

    return {
        token,
        setToken,
    };
};
