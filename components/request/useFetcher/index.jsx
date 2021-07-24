import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";

export const useFetcher = (props) => {
    const { url, token, query } = props;

    const fetcher = (url, token, query) =>
        axios
            .request({
                url: url + (query ? "?" + query : ""),
                headers: token ? { Authorization:`Bearer ${token}` } : {},
            })
            .then((res) => res.data);
    const { data, error } = useSWR([url, token, query], fetcher);

    return {
        data,
        error,
        loading: !data && !error,
    };
};
