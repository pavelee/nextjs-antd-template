import { useEffect, useState } from "react";
import { useAxios } from "../components/hooks/useAxios";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import "./app.css";

import PanelLayout from "../components/layout/PanelLayout";
import LoginPage from "../pages/login";

import { Spin } from "antd";

const config = (props) => {
    return {
        authorization: {
            enabled: true,
            page: {
                component: LoginPage,
            },
            login: (username, password) => {
                let correctUsername = "test";
                let correctPassword = "test";
                if (
                    username === correctUsername &&
                    password === correctPassword
                ) {
                    return true;
                }
                return false;
            },
            checkIfAuthorized: () => {},
            method: {
                check: (response) => {},
            },
        },
    };
};

function App({ Component, pageProps }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(undefined);
    const router = useRouter();

    const Config = config();
    const correctToken = "DUPA JASIA";

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
            setUser(null);
        }
    }, [token]);

    const login = (username, password) => {
        let correctUsername = "test";
        let correctPassword = "test";
        if (username === correctUsername && password === correctPassword) {
            setToken(correctToken);
            return true;
        }
        return false;
    };

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

    if (Config.authorization.enabled) {

        if (user === null) {
            // router.push('/login');
            let props = Object.assign({}, pageProps, { loginHandler: login });
            // return Config.authorization.page.component(props);
            return <LoginPage {...props} />
        }
    }

    switch (Component.name) {
        // case "LoginPage":
        //     if (Config.authorization.enabled) {
        //         return <LoginPage {...pageProps} />;
        //     }
        default:
            return (
                <PanelLayout>
                    <Component {...pageProps} />
                </PanelLayout>
            );
    }
}

export default App;
