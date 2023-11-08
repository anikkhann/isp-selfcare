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
import { TransactionData } from "@/interfaces/TransactionData";
import { format } from "date-fns";
import { useAppSelector } from "@/store/hooks";

const HomePaymentHistory = () => {
  const [data, setData] = useState<TransactionData[]>([]);

  const authUser = useAppSelector(state => state.auth.user);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const trxMode = "credit";
    const { data } = await axios.get(
      `/api/topup-transaction/get-selfcare-transaction/${authUser?.userId}?trxMode=${trxMode}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["transaction-list"],
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

  const columns: ColumnsType<TransactionData> = [
    // trx_date
    {
      title: "Trx Date",
      dataIndex: "trx_date",
      sorter: false,
      render: (trx_date: any) => {
        if (!trx_date) return "-";
        const date = new Date(trx_date);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "Trx Amount",
      dataIndex: "amount",
      render: (_, row) => {
        return <>{row.amount}</>;
      },
      sorter: false,
      width: 400,
      align: "center" as AlignType
    },
    {
      title: "Trx By",
      dataIndex: "trx_by",
      render: (_, row) => {
        return <>{row.trx_by}</>;
      },
      sorter: false,
      width: 400,
      align: "center" as AlignType
    },
    {
      title: "Trx Id",
      dataIndex: "transaction_id",
      render: (_, row) => {
        return <>{row.transaction_id}</>;
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
            <Card
              title="Payment History"
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
                rowKey={record => record.trx_date}
                dataSource={data}
                // pagination={tableParams.pagination}
                loading={isLoading || isFetching}
                // onChange={handleTableChange}
              />
            </Card>
          </Space>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default HomePaymentHistory;
