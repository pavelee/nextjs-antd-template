import "antd/dist/antd.css";
import "./app.css";

import { useAuth } from "../components/auth/useAuth";
import Dashboard from "../components/layout/dashboard";
import Login from "../components/auth/login";

function App({ Component, pageProps }) {
    const { user, loginHandler, logoutHandler } = useAuth({
        username: "test",
        password: "test",
        correctToken: "VALID_TOKEN",
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
                <Dashboard logoutHandler={logoutHandler}>
                    <Component {...pageProps} />
                </Dashboard>
            );
    }
}

export default App;
