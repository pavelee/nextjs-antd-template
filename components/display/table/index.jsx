import { useState } from "react";
import { Table as AntTable } from "antd";
import { useFetcher } from "../../request/useFetcher";

export const Table = (props) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(30);
    const [query, setQuery] = useState(null);

    const handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination, filters, sorter);
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
            for(let k in filters) {
                let v = filters[k];
                if (Array.isArray(v)) {
                    v.forEach(vv => {
                        queryParam.push(k + '[]=' + vv);
                    })
                } else {
                    queryParam.push(k + '=' + v);
                }
            }
        }
        let query = queryParam.join("&");
        setQuery(query);
    };

    const {
        dataSourceUrl,
        token = null,
        pageParamName = "page",
        perPageParamName = "per_page",
        orderParamName = "order",
        dataIndex = "",
        dataCountIndex = "",
    } = props;

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
