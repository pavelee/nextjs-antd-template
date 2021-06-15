import "antd/dist/antd.css";
import "./app.css";

import { useSimpleAuth } from "../components/auth/useSimpleAuth";
import Dashboard from "../components/layout/dashboard";
import Login from "../components/auth/login";

function App({ Component, pageProps }) {
    const { user, loginHandler, logoutHandler } = useSimpleAuth({
        username: "test",
        password: "test",
    });

    const authEnabled = true;
    if (authEnabled) {
        if (user === null) {
            return <Login loginHandler={loginHandler} {...pageProps} />;
        }
    }

    switch (Component.name) {
        default:
            return (
                <Dashboard
                    logoutHandler={logoutHandler}
                    menuItems={[
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
