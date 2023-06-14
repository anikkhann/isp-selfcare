/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import type { SelectProps } from "antd";
import type { DatePickerProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { format } from "date-fns";
import { getPlacesList } from "@/store/features/booking/PlaceSlice";

const SearchSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const categories: SelectProps["options"] = useAppSelector(
    state => state.category.categories
  );

  const SearchName = useAppSelector(state => state.search.name);
  const SearchLocation = useAppSelector(state => state.search.location);
  const searchDate = useAppSelector(state => state.search.date);

  console.log(searchDate);

  useEffect(() => {
    const date = new Date();
    const formatDate = format(date, "yyyy-MM-dd");

    const data = {
      category:
        categories && categories.length > 0 ? categories[0].value : null,
      name: null,
      date: formatDate,
      location: null,
      latitude: null,
      longitude: null,
      per_page: 10,
      page: 1
    };

    dispatch(getPlacesList(data));
  }, [categories, dispatch]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    // dispatch({ type: "search/setCategory", payload: value })
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      const date = new Date(dateString);
      const formatDate = format(date, "yyyy-MM-dd");
      // console.log('formatDate', formatDate)
      dispatch({ type: "search/setDate", payload: formatDate });
    } else {
      const date = new Date();
      const formatDate = format(date, "yyyy-MM-dd");
      dispatch({ type: "search/setDate", payload: formatDate });
    }
    // console.log(date, dateString);
  };

  const onFinish = (values: any) => {
    const { name, location, category, date } = values;

    if (name) {
      dispatch({ type: "search/setName", payload: name });
    } else {
    }
    if (location) {
      dispatch({ type: "search/setLocation", payload: location });
      console.log("location", location);
    }

    let formatDate = format(new Date(), "yyyy-MM-dd");

    if (date) {
      formatDate = format(new Date(date), "yyyy-MM-dd");
    }

    const data = {
      category: category,
      name: name ? name : null,
      date: formatDate,
      location: location,
      latitude: null,
      longitude: null,
      per_page: 10,
      page: 1
    };

    dispatch(getPlacesList(data));

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
            // labelCol={{ span: 16 }}
            // wrapperCol={{ span: 24 }}
            style={
              {
                // maxWidth: "100%",
                /* margin: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center" */
              }
            }
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="category"
              rules={[{ required: true, message: "Please select category!" }]}
              style={
                {
                  /*  minWidth: "150px",
                 margin: "10px 0px",
                 display: "flex",
                 justifyContent: "center", */
                }
              }
            >
              <Select
                allowClear
                style={{
                  width: 180,
                  minWidth: 180,
                  margin: "10px 0px"
                }}
                placeholder="Please Select Category"
                onChange={handleChange}
                options={categories}
              />
            </Form.Item>
            <Form.Item
              name="name"
              style={{
                minWidth: "150px",
                margin: "10px 0px",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Input
                placeholder="Search by name"
                style={{
                  width: 180,
                  minWidth: 180,
                  margin: "0px 10px"
                }}
                value={SearchName}
              />
            </Form.Item>
            <Form.Item name="location">
              <Input
                placeholder="Search by location"
                style={{
                  minWidth: "150px",
                  margin: "10px 0px"
                }}
                value={SearchLocation}
              />
            </Form.Item>
            <Form.Item name="date">
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
                htmlType="submit"
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
