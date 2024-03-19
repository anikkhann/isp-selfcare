/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, DatePicker, Row, Space } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import { useAppSelector } from "@/store/hooks";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { UsageData } from "@/interfaces/UsageData";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const dateFormat = "YYYY-MM-DD";

const UsageHistory: React.FC = () => {
  const [data, setData] = useState<UsageData[]>([]);

  const authUser = useAppSelector(state => state.auth.user);

  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);

  const { RangePicker } = DatePicker;

  const fetchData = async (startDateParam?: string, endDateParam?: string) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/customer/session-history/${authUser?.userName}?startDate=${startDateParam}&endDate=${endDateParam}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["usage-history", selectedStartDate, selectedEndDate],
    queryFn: async () => {
      const response = await fetchData(selectedStartDate, selectedEndDate);
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
    // {
    //   title: "IP",
    //   dataIndex: "IP",
    //   render: (_, row) => {
    //     return <>{row.IP}</>;
    //   },
    //   sorter: false,
    //   width: 400,
    //   align: "center" as AlignType
    // },
    // {
    //   title: "Device Mac",
    //   dataIndex: "device_mac",
    //   render: (_, row) => {
    //     return <>{row.device_mac}</>;
    //   },
    //   sorter: false,
    //   width: 400,
    //   align: "center" as AlignType
    // },
    {
      title: "Start Time",
      dataIndex: "start_time",
      render: (_, row) => {
        return <>{row.start_time}</>;
      },
      sorter: false,
      // width: 400,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      render: (_, row) => {
        return <>{row.end_time}</>;
      },
      sorter: false,
      // width: 400,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Online Time",
      dataIndex: "onlinetime",
      render: (_, row) => {
        return <>{row.onlinetime} Min</>;
      },
      sorter: false,
      // width: 400,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Upload",
      dataIndex: "upload",
      render: (_, row) => {
        return <>{row.upload}</>;
      },
      sorter: false,
      // width: 400,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Download",
      dataIndex: "download",
      render: (_, row) => {
        return <>{row.download}</>;
      },
      sorter: false,
      // width: 400,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Total",
      dataIndex: "total",
      render: (_, row) => {
        return <>{row.total}</>;
      },
      sorter: false,
      // width: 400,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    }

    // {
    //   title: "username",
    //   dataIndex: "username",
    //   render: (_, row) => {
    //     return <>{row.username}</>;
    //   },
    //   sorter: false,
    //   width: 400,
    //   align: "center" as AlignType
    // }
  ];

  const handleDateChange = (value: any) => {
    // console.log(value);

    if (value) {
      setSelectedDateRange(value);

      const startDate = dayjs(value[0]).format(dateFormat);
      const endDate = dayjs(value[1]).format(dateFormat);

      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate);

      // console.log(startDate, endDate);
    } else {
      setSelectedDateRange(null);
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }
  };

  const handleClear = () => {
    setSelectedDateRange(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

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

          <Card
            title="Usage History"
            style={{
              width: "100%",
              backgroundColor: "white",
              border: "1px solid #F15F22"
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Space style={{ marginBottom: 16, width: "100%" }}>
                <Row
                  gutter={[16, 16]}
                  justify="space-between"
                  style={{ width: "100%" }}
                >
                  <Col
                    xs={24}
                    sm={16}
                    md={16}
                    lg={16}
                    xl={16}
                    xxl={16}
                    className="gutter-row"
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <span>
                        <b>Date Range</b>
                      </span>
                      <RangePicker
                        style={{ width: "100%" }}
                        onChange={handleDateChange}
                        value={selectedDateRange}
                        placeholder={["Start Date", "End Date"]}
                      />
                    </Space>
                  </Col>

                  <Col
                    xs={24}
                    sm={8}
                    md={8}
                    lg={8}
                    xl={8}
                    xxl={8}
                    className="gutter-row"
                  >
                    <Button
                      style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "25px",
                        backgroundColor: "#F15F22",
                        color: "#ffffff"
                      }}
                      onClick={() => {
                        handleClear();
                      }}
                      className="ant-btn  ant-btn-lg"
                    >
                      Clear filters
                    </Button>
                  </Col>
                </Row>
              </Space>
              <Table
                style={{
                  width: "100%",
                  overflowX: "auto"
                }}
                className={"table-striped-rows"}
                columns={columns}
                rowKey={record => record.start_time}
                dataSource={data}
                loading={isLoading || isFetching}
                scroll={{ x: true }}
              />
            </Space>
          </Card>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default UsageHistory;
