import { useState, useEffect } from "react";

export const useUser = (props) => {
    const {
        token,
        correctToken,
        localUser = {
            name: "test",
        },
    } = props;
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        if (token && token === correctToken) {
            setUser(localUser);
        } else {
            setUser(null);
        }
    }, [token]);

    return {
        user
    };
};
