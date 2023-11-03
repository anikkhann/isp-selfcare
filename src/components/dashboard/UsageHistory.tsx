/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Space } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import { UsageData } from "@/interfaces/UsageData";
import { useAppSelector } from "@/store/hooks";

const UsageHistory = () => {
  const [data, setData] = useState<UsageData[]>([]);

  const authUser = useAppSelector(state => state.auth.user);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/customer/session-history/${authUser?.userName}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["usage-list"],
    queryFn: async () => {
      const response = await fetchData();
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        // console.log("data.data", data);
        if (data.body) {
          setData(data.body);
        } else {
          setData([]);
        }
      }
    },
    onError(error: any) {
      console.log("error", error);
    }
  });

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  const columns: ColumnsType<UsageData> = [
    {
      title: "IP",
      dataIndex: "IP",
      render: (_, row) => {
        return <>{row.IP}</>;
      },
      sorter: false,
      width: 400,
      align: "center" as AlignType
    },
    {
      title: "download",
      dataIndex: "download",
      render: (_, row) => {
        return <>{row.download}</>;
      },
      sorter: false,
      width: 400,
      align: "center" as AlignType
    },
    {
      title: "upload",
      dataIndex: "upload",
      render: (_, row) => {
        return <>{row.upload}</>;
      },
      sorter: false,
      width: 400,
      align: "center" as AlignType
    },
    {
      title: "onlinetime",
      dataIndex: "onlinetime",
      render: (_, row) => {
        return <>{row.onlinetime}</>;
      },
      sorter: false,
      width: 400,
      align: "center" as AlignType
    },
    {
      title: "total",
      dataIndex: "total",
      render: (_, row) => {
        return <>{row.total}</>;
      },
      sorter: false,
      width: 400,
      align: "center" as AlignType
    },

    {
      title: "start_time",
      dataIndex: "start_time",
      render: (_, row) => {
        return <>{row.start_time}</>;
      },
      sorter: false,
      width: 400,
      align: "center" as AlignType
    },
    {
      title: "end_time",
      dataIndex: "end_time",
      render: (_, row) => {
        return <>{row.end_time}</>;
      },
      sorter: false,
      width: 400,
      align: "center" as AlignType
    }
  ];

  return (
    <>
      <AppRowContainer>
        <Col span={24} key="data-f">
          {isError && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: " 10px 5px"
                }}
              >
                <Card
                  title="Error"
                  style={{
                    width: 300,
                    color: "#FF5630",
                    backgroundColor: "#ffffff"
                  }}
                >
                  <p>
                    {error &&
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                      ? error.response.data.message
                      : error.message
                      ? error.message
                      : "Something went wrong"}
                  </p>
                </Card>
              </div>
            </>
          )}

          <Space direction="vertical" style={{ width: "100%" }}>
            <Table
              columns={columns}
              rowKey={record => record.start_time}
              dataSource={data}
              // pagination={tableParams.pagination}
              loading={isLoading || isFetching}
              // onChange={handleTableChange}
            />
          </Space>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default UsageHistory;
