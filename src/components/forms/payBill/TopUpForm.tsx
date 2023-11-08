/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Alert, Button, Form, Row, Col, Input, Space, Select } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";

interface FormData {
  amount: string;
}

const TopUpForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [paymentGateways, setPaymentGateways] = useState<any>([]);
  const [selectedPaymentGateway, setSelectedPaymentGateway] =
    useState<any>(null);

  // const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handlePaymentGatewayChange = (value: any) => {
    setSelectedPaymentGateway(value);
    form.setFieldsValue({
      paymentGatewayId: value
    });
  };

  function getPaymentGateway() {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        isActive: true
      }
    };

    axios.post("/api/payment-gateway-config/get-list", body).then(res => {
      const { data } = res;
      // console.log(data.body);
      if (data.status != 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
      }

      if (!data.body) return;

      const list = data.body.map((item: any) => {
        return {
          label: item.paymentGateway.bankName,
          value: item.id
        };
      });

      setPaymentGateways(list);
    });
  }

  useEffect(() => {
    getPaymentGateway();

    return () => {
      setPaymentGateways([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: FormData) => {
    setLoading(true);

    const { amount } = data;

    const formData = {
      amount: amount,
      paymentGatewayId: selectedPaymentGateway
    };

    try {
      axios
        .post("/api/customer-topup/selfcare-topup", formData)
        .then(res => {
          const { data } = res;

          if (data.status != 200) {
            setShowError(true);
            setErrorMessages(data.message);
            MySwal.fire({
              title: "Error",
              text: data.message || "Something went wrong",
              icon: "error"
            });
          }

          if (data.status == 200) {
            MySwal.fire({
              title: "Success",
              text: data.message || "Updated successfully",
              icon: "success"
            }).then(() => {
              form.resetFields();
              setSelectedPaymentGateway(null);
              if (data.body.expected_url) {
                const url = data.body.expected_url;
                window.open(url, "_blank");
              }
            });
          }
        })
        .catch(err => {
          // console.log(err);
          MySwal.fire({
            title: "Error",
            text: err.response.data.message || "Something went wrong",
            icon: "error"
          });
          setShowError(true);
          setErrorMessages(err.response.data.message);
        });
    } catch (err: any) {
      // console.log(err)
      setShowError(true);
      setErrorMessages(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <AppImageLoader />}

      {showError && <Alert message={errorMessages} type="error" showIcon />}

      {!loading && (
        <div className="mt-8 mx-5">
          <Form
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmit}
            form={form}
            initialValues={{
              amount: ""
            }}
            style={{ maxWidth: "100%" }}
            name="wrap"
            colon={false}
            scrollToFirstError
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                xxl={24}
                className="gutter-row"
              >
                <Form.Item
                  name="amount"
                  label="Amount"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Amount!"
                    }
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Amount" style={{ padding: "6px" }} />
                </Form.Item>
              </Col>

              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                xxl={24}
                className="gutter-row"
              >
                <Form.Item
                  label="Payment Gateway"
                  name="paymentGatewayId"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please select!"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select"
                      onChange={handlePaymentGatewayChange}
                      options={paymentGateways}
                      value={selectedPaymentGateway}
                    />
                  </Space>
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center" gutter={[16, 16]} className="mt-5">
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                <Form.Item>
                  {/* wrapperCol={{ ...layout.wrapperCol, offset: 4 }} */}
                  <Button
                    // type="primary"
                    htmlType="submit"
                    shape="round"
                    style={{
                      backgroundColor: "#F15F22",
                      color: "#FFFFFF",
                      fontWeight: "bold"
                    }}
                    loading={loading}
                    disabled={loading}
                  >
                    Top Up
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </>
  );
};

export default TopUpForm;
