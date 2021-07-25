import { useState } from "react";
import { Table as AntTable } from "antd";
import { Form, Input, Card, Button, Space } from "antd";
import { useFetcher } from "../../request/useFetcher";

export const TextSearchFilter = (name, searchText = 'Search', cancelText = 'Cancel') => ({
    filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
    }) => (
        <Card>
            <Space direction={"vertical"}>
                <Form>
                    <Input
                        placeholder={`${name}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
                        }
                        onPressEnter={() => {
                            confirm();
                        }}
                    />
                </Form>
                <Space>
                    <Button onClick={() => confirm()}>{searchText}</Button>
                    <Button
                        onClick={() => {
                            clearFilters();
                        }}
                    >
                        {cancelText}
                    </Button>
                </Space>
            </Space>
        </Card>
    ),
});

export const Table = (props) => {
    const {
        dataSourceUrl,
        token = null,
        defaultPage = 1,
        defaultPerPage = 20,
        defaultQuery = null,
        pageParamName = "page",
        perPageParamName = "per_page",
        orderParamName = "order",
        dataIndex = "",
        dataCountIndex = "",
    } = props;

    const [page, setPage] = useState(defaultPage);
    const [perPage, setPerPage] = useState(defaultPerPage);
    const [query, setQuery] = useState(defaultQuery);

    const handleTableChange = (pagination, filters, sorter) => {
        let queryParam = [];
        if (pagination.current) {
            queryParam.push(pageParamName + "=" + pagination.current);
            setPage(pagination.current);
        }
        if (pagination.pageSize) {
            queryParam.push(perPageParamName + "=" + pagination.pageSize);
            setPerPage(pagination.perPage);
        }
        if (sorter.order && sorter.field) {
            queryParam.push(
                orderParamName +
                    "[" +
                    sorter.field +
                    "]=" +
                    (sorter.order === "ascend" ? "asc" : "desc")
            );
        }
        if (filters) {
            for (let k in filters) {
                let v = filters[k];
                if (v) {
                    if (Array.isArray(v)) {
                        v.forEach((vv) => {
                            queryParam.push(k + "[]=" + vv);
                        });
                    } else {
                        queryParam.push(k + "=" + v);
                    }
                }
            }
        }
        let query = queryParam.join("&");
        setQuery(query);
    };

    const { data, error, loading } = useFetcher({
        url: dataSourceUrl,
        token: token,
        query: query,
    });

    return (
        <AntTable
            dataSource={data && dataIndex ? data[dataIndex] : data}
            loading={loading}
            onChange={handleTableChange}
            pagination={{
                showSizeChanger: true,
                total: data && dataCountIndex ? data[dataCountIndex] : 0,
                pageSize: perPage,
                defaultCurrent: page,
            }}
            {...props}
        />
    );
};
