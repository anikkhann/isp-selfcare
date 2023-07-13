/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import type { SelectProps } from "antd";
import type { DatePickerProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getPlacesList } from "@/store/features/booking/PlaceSlice";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const SearchSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const categories: SelectProps["options"] = useAppSelector(
    state => state.category.categories
  );

  const SearchName = useAppSelector(state => state.search.name);
  const SearchLocation = useAppSelector(state => state.search.location);
  const searchDate = useAppSelector(state => state.search.date);

  useEffect(() => {
    const formattedDate = dayjs(searchDate).format("YYYY-MM-DD");

    const data = {
      category:
        categories && categories.length > 0 ? categories[0].value : null,
      name: null,
      date: formattedDate,
      location: null,
      latitude: null,
      longitude: null,
      per_page: 10,
      page: 1
    };

    dispatch(getPlacesList(data));
  }, [categories, dispatch, searchDate]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    // dispatch({ type: "search/setCategory", payload: value })
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      const newDate = dayjs(dateString);
      dispatch({ type: "search/setDate", payload: newDate });
    } else {
      const newDate = dayjs();
      dispatch({ type: "search/setDate", payload: newDate });
    }
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

    const formatDate = dayjs().format("YYYY-MM-DD");

    if (date) {
      const formattedDate = dayjs(date, "YYYY-MM-DD").format("YYYY-MM-DD");
      console.log(formattedDate);
    } else {
      console.log(formatDate);
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

    // console.log("Success:", values);
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
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            margin: "0 auto"
          }}
        >
          <Form
            layout="inline"
            // labelCol={{ span: 16 }}
            // wrapperCol={{ span: 24 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              margin: "0 auto"
            }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="category"
              rules={[{ required: true, message: "Please select category!" }]}
              style={{
                minWidth: 180,
                margin: "20px",

                display: "flex",
                justifyContent: "center"
              }}
            >
              <Select
                allowClear
                style={{
                  width: 180,
                  minWidth: 180
                }}
                placeholder="Please Select Category"
                onChange={handleChange}
                options={categories}
              />
            </Form.Item>
            <Form.Item
              name="name"
              style={{
                minWidth: 180,
                margin: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Input
                placeholder="Search by Name"
                style={{
                  minWidth: 180
                }}
                value={SearchName}
              />
            </Form.Item>
            <Form.Item
              name="location"
              style={{
                minWidth: 180,
                margin: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Input
                placeholder="Search by location"
                style={{
                  minWidth: 180
                }}
                value={SearchLocation}
              />
            </Form.Item>
            <Form.Item
              name="date"
              style={{
                minWidth: 180,
                margin: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <DatePicker
                placeholder="Search by Date"
                onChange={onChange}
                style={{
                  minWidth: 180
                }}
                value={searchDate}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  minWidth: 180,
                  margin: "10px 0px",
                  color: "#fff",
                  backgroundColor: "#EC4B15"
                }}
              >
                Search
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default SearchSection;
