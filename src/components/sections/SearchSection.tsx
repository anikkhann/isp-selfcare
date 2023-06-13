import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import React from "react";
import type { SelectProps } from "antd";
import type { DatePickerProps } from "antd";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i
  });
}

const SearchSection: React.FC = () => {
  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div>
        <Card
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Form
            layout="inline"
            labelCol={{ span: 16 }}
            wrapperCol={{ span: 24 }}
            style={{
              maxWidth: "100%",
              margin: "10px 0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item>
              <Select
                allowClear
                style={{
                  width: 180,
                  minWidth: 180,
                  margin: "10px 0px"
                }}
                placeholder="Please select"
                defaultValue={["a10", "c12"]}
                onChange={handleChange}
                options={options}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="input placeholder"
                style={{
                  minWidth: "150px",
                  margin: "10px 0px"
                }}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="input placeholder"
                style={{
                  minWidth: "150px",
                  margin: "10px 0px"
                }}
              />
            </Form.Item>
            <Form.Item>
              <DatePicker
                placeholder="তারিখ নির্বাচন করুন"
                onChange={onChange}
                style={{
                  minWidth: "180px",
                  margin: "10px 0px"
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                danger
                style={{
                  minWidth: "150px",
                  margin: "10px 0px"
                }}
              >
                সার্চ করুন
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default SearchSection;
