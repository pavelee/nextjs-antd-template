import { useEffect, useState } from "react";
import { useAxios } from "../components/hooks/useAxios";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import "./app.css";

import { useAuth } from "../components/auth/useAuth";
import PanelLayout from "../components/layout/PanelLayout";
import LoginPage from "../components/auth/LoginPage";

function App({ Component, pageProps }) {
    const { user, loginHandler, logoutHandler } = useAuth({
        username: "test",
        password: "test",
        correctToken: "VALID_TOKEN",
    });

    const authEnabled = true;
    if (authEnabled) {
        if (user === null) {
            return <LoginPage loginHandler={loginHandler} {...pageProps} />;
        }
    }

    switch (Component.name) {
        default:
            return (
                <PanelLayout logoutHandler={logoutHandler}>
                    <Component {...pageProps} />
                </PanelLayout>
            );
    }
}

export default App;
