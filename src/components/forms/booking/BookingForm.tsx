/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, DatePicker, Form, Radio, Row } from "antd";
import React, { useEffect, useState } from "react";
import type { DatePickerProps } from "antd";
import type { RadioChangeEvent } from "antd";
import { format } from "date-fns";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

interface ItemProps {
  item: any;
}

const BookingForm = ({ item }: ItemProps) => {
  dayjs.extend(weekday);
  dayjs.extend(localeData);

  const [value4, setValue4] = useState("Apple");

  const [slots, setSlots] = useState<any[]>([]);

  const [payType, setPayType] = useState("minimum");

  console.log(payType);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onPaymentChange = (e: RadioChangeEvent) => {
    console.log("payment type", e.target.value);
    setPayType(e.target.value);
  };

  const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio4 checked", value);
    setValue4(value);
  };

  useEffect(() => {
    console.log("item", item);
    if (item) {
      const { slots } = item;
      const newSlots = slots.map((slot: any) => {
        const timeString = slot.slot?.start_time;
        if (!timeString) return;
        const startTime = new Date(`1970-01-01T${timeString}`);
        const startTimeWithFormat = format(startTime, "h:mm:ss a");

        const endTimeString = slot.slot?.end_time;
        if (!timeString) return;
        const endTime = new Date(`1970-01-01T${endTimeString}`);
        const endTimeWithFormat = format(endTime, "h:mm:ss a");

        return {
          label: startTimeWithFormat + " - " + endTimeWithFormat,
          value: slot.id
        };
      });
      setSlots(newSlots);
    }
  }, [item]);

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div
          style={{
            padding: "20px 0"
          }}
        >
          <Row gutter={[10, 10]}>
            <Col sm={24} md={12}>
              <Card
                title="বুকিং ডিটেলস"
                style={{
                  width: "100%",
                  textAlign: "center"
                }}
              >
                <Form.Item label="বুকিং তারিখ" name="bookingDate">
                  <DatePicker onChange={onChange} />
                </Form.Item>

                <p
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: 700
                  }}
                >
                  স্লট সিলেক্ট করুন
                </p>

                <Radio.Group
                  options={slots}
                  onChange={onChange4}
                  value={value4}
                  optionType="button"
                  buttonStyle="solid"
                  className="space-y-4 space-x-2"
                  style={
                    {
                      /*  width: "100%",
                     display: "inline-flex" */
                    }
                  }
                />
              </Card>
            </Col>
            <Col sm={24} md={12}>
              <Card
                title="পেমেন্ট ডিটেলস"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  justifyContent: "center",
                  background: "#f5f5f5"
                }}
              >
                <Form.Item label="পেমেন্ট মেথড" name="bookingDate">
                  <Radio.Group
                    onChange={onPaymentChange}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "20px"
                    }}
                  >
                    <Radio value="minimum">ন্যূনতম মূল্য</Radio>
                    <Radio value="full">সর্বমোট মূল্য</Radio>
                  </Radio.Group>
                </Form.Item>

                <Card style={{ width: "100%" }}>
                  <div className="flex justify-between p-4">
                    <span className="text-lg text-[#333333]">স্লটের দাম:</span>
                    <span className="text-lg text-[#6F6E6E]">6000BDT</span>
                  </div>
                  <div className="flex justify-between p-4">
                    <span className="text-lg text-[#333333]">
                      ডিসকাউন্টের পরিমান::
                    </span>
                    <span className="text-lg text-[#6F6E6E]">6000BDT</span>
                  </div>
                  <div className="flex justify-between p-4">
                    <span className="text-lg text-[#333333]">
                      পরিশোধ মূল্য:
                    </span>
                    <span className="text-lg text-[#6F6E6E]">6000BDT</span>
                  </div>
                </Card>

                <Form.Item
                  className="mt-4"
                  wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 24, offset: 0 }
                  }}
                >
                  <Button type="primary" htmlType="submit" block>
                    Submit
                  </Button>
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default BookingForm;
