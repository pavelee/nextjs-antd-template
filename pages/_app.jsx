import "antd/dist/antd.css";

import { Spin } from "antd";
import { useAuth as useLocalAuth } from "../components/auth/local/useAuth";
import { useUser as useLocalUser } from "../components/auth/local/useUser";
import Dashboard from "../components/layout/dashboard";
import Login from "../components/auth/login";
import { PageLoader } from "../components/loader/pageLoader";
import { useAuth } from "../components/auth/api/useAuth";
import { useUser } from "../components/auth/api/useUser";

function App({ Component, pageProps }) {
    const correctUsername = "test";
    const correctPassword = "test";
    const correctToken = correctUsername;
    const { token, error, loginHandler, logoutHandler } = useLocalAuth({
        username: correctUsername,
        password: correctPassword,
        correctToken,
    });
    const { user } = useLocalUser({
        token,
        correctToken,
    });

    // uncomment if you want to enable API auth
    // const { token, error, loginHandler, logoutHandler } = useAuth({
    //     authUrl: "http://localhost:8444/login",
    // });
    // const { user } = useUser({
    //     token,
    //     fetchUserUrl: "http://localhost:8444/current-user",
    // });

    const authEnabled = true;
    if (authEnabled) {
        if (user === undefined) {
            return <PageLoader />;
        }
        if (user === null) {
            return (
                <Login
                    loginHandler={loginHandler}
                    error={error}
                    {...pageProps}
                />
            );
        }
    }

    switch (Component.name) {
        default:
            return (
                <Dashboard
                    user={user}
                    logoutHandler={logoutHandler}
                    menuItems={[
                        {
                            key: "test",
                            title: "test",
                            childs: [
                                {
                                    key: "dd",
                                    title: "dd",
                                    href: "/test/dd",
                                },
                            ],
                        },
                        {
                            key: "dashboard",
                            title: "dashboard",
                            href: "/",
                        },
                        {
                            key: "dispatcher",
                            title: "???",
                            href: "/",
                        },
                    ]}
                >
                    <Component {...pageProps} />
                </Dashboard>
            );
    }
}

export default App;
