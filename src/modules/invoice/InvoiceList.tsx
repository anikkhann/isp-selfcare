/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Space, Tag } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";

import AppAxios from "@/services/AppAxios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import { DownloadOutlined, PayCircleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const InvoiceList: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]);

  const [page, SetPage] = useState(1);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("ASC");
  const [sort, SetSort] = useState("id");

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });
  const MySwal = withReactContent(Swal);

  async function handleDownload(id: number) {
    const url =
      process.env.NEXT_PUBLIC_BACKEND_URL + `/admin/invoice/download/${id}`;
    window.open(url, "_blank");
  }

  async function handlePendingDueItem(id: number) {
    try {
      const result = await MySwal.fire({
        title: "নিশ্চিত করুন",
        text: "বুকিং করার জন্য মূল্য পরিশোধ করুন",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#570DF8",
        cancelButtonColor: "#EB0808",
        confirmButtonText: "yes"
      });

      if (result.isConfirmed) {
        const { data } = await AppAxios.post(`/invoice/payment`, {
          id: id
        });
        if (data.success) {
          const url = data.data.expected_url;
          window.open(url, "_blank");
        } else {
          MySwal.fire("Error!", data.message, "error");
        }
      } else if (result.isDismissed) {
        MySwal.fire(
          "বাতিল করা হলো",
          "আপনার জন্য স্লটটি বুক করা হয় নি",
          "error"
        );
      }
    } catch (error) {
      console.log(error);
      MySwal.fire("এরর", "কিছু ভুল হয়েছে", "error");
    }
  }

  const columns: ColumnsType<any> = [
    {
      title: "Invoice ID",
      dataIndex: "id",
      sorter: true,
      // width: "10%",
      align: "center" as AlignType
    },
    {
      title: "Invoice For",
      dataIndex: "invoice_for",
      sorter: true,
      // width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Invoice By",
      dataIndex: "name",
      render: (text: any, row: any) => {
        return (
          <Space size="middle" align="center" wrap>
            {row.user?.name}
          </Space>
        );
      },
      // width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Expired Date",
      dataIndex: "expired_date",
      sorter: true,
      // width: "20%",
      align: "center" as AlignType
    },

    {
      title: "Reason",
      dataIndex: "reason",
      sorter: true,
      // width: "20%",
      align: "center" as AlignType
    },

    {
      title: "Month",
      dataIndex: "month",
      sorter: true,
      // width: "20%",
      align: "center" as AlignType
    },

    {
      title: "Price",
      dataIndex: "total_price",
      sorter: true,
      // width: "20%",
      align: "center" as AlignType
    },

    {
      title: "Status",
      dataIndex: "is_paid",
      sorter: true,
      render: (text: any, record: any) => {
        return (
          <Space size="middle" align="center" wrap>
            {record.is_paid ? (
              <Tag color="#108ee9">Paid</Tag>
            ) : (
              <Tag color="#FF5630">Unpaid</Tag>
            )}
          </Space>
        );
      },
      // width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Method",
      dataIndex: "is_manual",
      sorter: false,
      render: (text: any, record: any) => {
        return (
          <Space size="middle" align="center" wrap>
            {record.is_paid == 1 && record.is_manual == 0 && (
              <Tag color="#2db38b">Online</Tag>
            )}
            {record.is_paid == 1 && record.is_manual == 1 && (
              <Tag color="#108ee9">Manual</Tag>
            )}
            {record.is_paid == 0 && record.is_manual == 0 && (
              <Tag color="#FF5630">Unpaid</Tag>
            )}
          </Space>
        );
      },
      // width: "20%",
      align: "center" as AlignType
    },

    {
      title: "Action",
      dataIndex: "action",
      sorter: false,
      render: (text: any, record: any) => {
        return (
          <>
            <Space size="middle" align="center">
              {record.is_paid == 0 && (
                <Space size="middle" align="center" wrap>
                  <Button
                    type="primary"
                    style={{
                      color: "#fff",
                      backgroundColor: "#EC4B15"
                    }}
                    icon={<PayCircleOutlined />}
                    onClick={() => handlePendingDueItem(record.id)}
                  />
                </Space>
              )}
              <Space size="middle" align="center" wrap>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownload(record.id)}
                />
              </Space>
            </Space>
          </>
        );
      },
      align: "center" as AlignType
    }
  ];

  const fetchData = async (
    page: number,
    limit: number,
    order: string,
    sort: string
  ) => {
    const token = Cookies.get("token");
    // console.log('token', token)
    AppAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await AppAxios.get(
      `/web-user-invoice-list?page=${page}&limit=${limit}&order=${order}&sort=${sort}`
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["item-list", page, limit, order, sort],
    queryFn: async () => {
      const response = await fetchData(page, limit, order, sort);
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        console.log("data", data);

        setTableData(data.data.invoices);
        setTableParams({
          pagination: {
            total: data.meta.total,
            pageSize: data.meta.limit,
            current: data.meta.page,
            pageSizeOptions: ["10", "20", "30", "40", "50"]
          }
        });
      }
    },
    onError(error: any) {
      console.log("error", error);
    }
  });

  useEffect(() => {
    // console.log('data -b', data)
    if (tableData) {
      // console.log('data', data)
      setTableData(tableData);
    }
  }, [tableData]);

  // console.log(error, isLoading, isError)

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<any>).order) {
      // console.log((sorter as SorterResult<any>).order)

      SetOrder(
        (sorter as SorterResult<any>).order === "ascend" ? "ASC" : "DESC"
      );
    }
    if (sorter && (sorter as SorterResult<any>).field) {
      // console.log((sorter as SorterResult<any>).field)

      SetSort((sorter as SorterResult<any>).field as string);
    }
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

          <TableCard
            title="Invoice List"
            hasLink={false}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              padding: "10px",
              overflow: "auto"
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {/* <Space style={{ marginBottom: 16 }}>
                <Button >Sort age</Button>
                <Button >Clear filters</Button>
                <Button >Clear filters and sorters</Button>
              </Space> */}

              <Table
                columns={columns}
                rowKey={record => record.id}
                dataSource={tableData}
                pagination={tableParams.pagination}
                loading={isLoading || isFetching}
                onChange={handleTableChange}
                style={{
                  width: "100%",

                  borderRadius: "10px",
                  padding: "10px",
                  overflow: "auto"
                }}
              />
            </Space>
          </TableCard>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default InvoiceList;
