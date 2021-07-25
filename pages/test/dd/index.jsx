import { useEffect } from "react";

import { Table, TextSearchFilter } from "../../../components/display/table";

const DD = (props) => {
    const { setCurrentMenuItem, setCurrentMenuOpenKeys } = props;

    useEffect(() => {
        setCurrentMenuItem("dd");
        setCurrentMenuOpenKeys(["test"]);
    }, []);

    return (
        <Table
            columns={[
                {
                    title: "id",
                    dataIndex: "id",
                    sorter: true,
                },
                {
                    title: "type",
                    dataIndex: "type",
                    sorter: true,
                    ...TextSearchFilter('type')
                },
                {
                    title: "setup",
                    dataIndex: "setup",
                },
                {
                    title: "punchline",
                    dataIndex: "punchline",
                },
            ]}
            dataSourceUrl={"https://official-joke-api.appspot.com/jokes/ten"}
            rowKey={"id"}
        />
    );
};

export default DD;
