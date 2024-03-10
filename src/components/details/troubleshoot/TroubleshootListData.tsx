/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, List, Pagination, Row, Space } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axios from "axios";
import { ArrowRightOutlined } from "@ant-design/icons";

export interface TroubleshootData {
  createdOn: number;
  id: string;
  type: string;
  title: string;
  options: string;
  isActive: boolean;
}

export interface ConvertTroubleshootData {
  createdOn: number;
  id: string;
  type: string;
  title: string;
  options: any[];
  isActive: boolean;
}

const TroubleshootListData: React.FC = () => {
  const [data, setData] = useState<ConvertTroubleshootData[]>([]);

  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const fetchData = async (page: number) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        page: page,
        limit: 10
        // sort: [
        //   {
        //     order: "asc",
        //     field: "title"
        //   }
        // ]
      },
      body: {
        type: "Troubleshoot",
        isActive: true
      }
    };

    const { data } = await axios.post(
      `/api/troubleshoot-survey/get-list`,
      body,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["troubleshoot-list", page],
    queryFn: async () => {
      const response = await fetchData(page);
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        if (data.body) {
          const newData = data.body.map((item: TroubleshootData) => {
            // convert options to array
            // remove
            const options = item.options
              .slice(1, -1) // Remove the curly braces
              .split(",")
              .map(option => option.replace(/'/g, "").trim());

            const newOptions = options.map((option: any, index: number) => {
              return {
                option: option,
                index: index
              };
            });

            return {
              ...item,
              options: newOptions
            };
          });
          setData(newData);

          setPage(data.meta.page);
          setTotal(data.meta.totalRecords);
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
          <div
            style={{
              width: "100%",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              margin: "0 auto",
              // border: "1px solid #F15F22",
              textAlign: "center"
            }}
          >
            <h1
              style={{
                fontSize: "1.5rem",
                marginTop: "1rem",
                marginBottom: "1rem",
                color: "#F15F22",
                fontWeight: "bolder",
                padding: "0.5rem 0.5rem 0 0"
              }}
            >
              Troubleshoot List
            </h1>
          </div>

          {/* <Card title="Troubleshoot List" style={{ width: "100%", backgroundColor:"white" }} loading={isLoading || isFetching}> */}
          <Space direction="vertical" style={{ width: "100%" }}>
            {/* <Card style={{ width: "100%", backgroundColor:"black" }} loading={isLoading || isFetching}> */}
            <Row gutter={[16, 16]} justify={"center"}>
              {data.length > 0 &&
                data.map((item: ConvertTroubleshootData, index: number) => {
                  return (
                    <Col lg={12} md={12} sm={24} xs={24} key={index}>
                      <Card
                        title={item.title}
                        style={{
                          width: "100%",
                          color: "#FF5630",
                          backgroundColor: "#ffffff",
                          border: "1px solid #F15F22"
                        }}
                        loading={isLoading || isFetching}
                      >
                        <List
                          size="large"
                          // bordered
                          dataSource={item.options}
                          renderItem={(list, index) => (
                            <List.Item
                              key={index}
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center"
                              }}
                            >
                              <ArrowRightOutlined />
                              <p
                                style={{
                                  marginLeft: "10px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  margin: "10px"
                                }}
                              >
                                {list.option}
                              </p>
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>
                  );
                })}
            </Row>
            <Pagination
              defaultCurrent={1}
              total={total}
              onChange={page => setPage(page)}
              // showTotal={(total, range) =>
              //   `${range[0]}-${range[1]} of ${total} items`
              // }
              defaultPageSize={10}
            />
            {/* </Card> */}
          </Space>
          {/* </Card> */}
        </Col>
      </AppRowContainer>
    </>
  );
};

export default TroubleshootListData;
