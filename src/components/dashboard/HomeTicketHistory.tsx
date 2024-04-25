/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Space, Tag } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import { TicketData } from "@/interfaces/TicketData";
import { format } from "date-fns";

const HomeTicketHistory = () => {
  const [data, setData] = useState<TicketData[]>([]);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const body = {
      meta: {
        limit: 10,
        // page: page === 0 ? 0 : page - 1,
        sort: [
          {
            order: "desc",
            field: "createdOn"
          }
        ]
      },
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
      }
    };

    const { data } = await axios.post("/api/ticket/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["ticket-list"],
    queryFn: async () => {
      const response = await fetchData();
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        // console.log("data.data", data);
        if (data.body) {
          setData(data.body);
          // setTableParams({
          //   pagination: {
          //     total: data.meta.totalRecords,
          //     pageSize: data.meta.limit,
          //     current: (data.meta.page as number) + 1,
          //     pageSizeOptions: ["10", "20", "30", "40", "50"]
          //   }
          // });
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

  const columns: ColumnsType<TicketData> = [
    {
      title: "Ticket No",
      dataIndex: "ticketNo",
      render: (_, row) => {
        return <>{row.ticketNo}</>;
      },
      sorter: false,
      // width: 400,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Complaint",
      dataIndex: "complainType",
      render: (_, row) => {
        return <>{row.complainType.name}</>;
      },
      sorter: false,
      // width: 400,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Ticket Status",
      dataIndex: "status",
      sorter: true,
      render: (status: any) => {
        return (
          <>
            {status === "open" ? (
              <Tag color="green">{status}</Tag>
            ) : status === "closed" ? (
              <Tag color="red">{status}</Tag>
            ) : (
              <Tag color="blue">{status}</Tag>
            )}
          </>
        );
      },
      // width: 150,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    // updatedOn
    {
      title: "Last Updated At",
      dataIndex: "updatedOn",
      sorter: false,
      render: (updatedOn: any) => {
        if (!updatedOn) return "-";
        const date = new Date(updatedOn);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
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
            <Card
              title="Ticket History"
              style={{
                width: "100%",
                backgroundColor: "white",
                border: "1px solid #F15F22"
              }}
              loading={isLoading || isFetching}
            >
              <Table
                style={{
                  width: "100%",
                  overflowX: "auto"
                }}
                className={"table-striped-rows"}
                columns={columns}
                rowKey={record => record.id}
                dataSource={data}
                loading={isLoading || isFetching}
                scroll={{ x: true }}
              />
            </Card>
          </Space>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default HomeTicketHistory;
