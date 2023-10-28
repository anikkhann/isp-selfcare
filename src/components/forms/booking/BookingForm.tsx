/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, DatePicker, Form, Radio, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import LoginAppLoader from "@/components/loader/LoginAppLoader";
import AppAxios from "@/services/AppAxios";
import dayjs from "dayjs";
import type { DatePickerProps } from "antd";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const dateFormat = "YYYY-MM-DD";

const BookingForm = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [slots, setSlots] = useState<any[]>([]);

  const [payType, setPayType] = useState("minimum");

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const searchDate = useAppSelector(state => state.search.date);
  const item = useAppSelector(state => state.placeDetails.item);
  const isLoading = useAppSelector(state => state.placeDetails.isLoading);

  const dispatch = useAppDispatch();

  const [slotTotalPrice, setSlotTotalPrice] = useState(0);
  const [slotDiscountPrice, setSlotDiscountPrice] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);

  const [bookingAmount, setBookingAmount] = useState(0);

  const onFinish = () => {
    // console.log("Success:", values);

    try {
      AppAxios.post("/web-confirm-booking", {
        place_slot_id: selectedSlot ? selectedSlot : null,
        date: searchDate ? dayjs(searchDate).format("YYYY-MM-DD") : null,
        price: bookingAmount ? bookingAmount : 0,
        discount: slotDiscountPrice ? slotDiscountPrice : 0,
        total_price: priceAfterDiscount ? priceAfterDiscount : 0
      })
        .then(res => {
          // console.log(res);
          if (res.data.success) {
            setSelectedSlot(null);
            setPriceAfterDiscount(0);
            setSlotDiscountPrice(0);
            setSlotTotalPrice(0);
            setBookingAmount(0);

            const url = res.data.data.expected_url;
            window.open(url, "_blank");
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    const newDate = dayjs(dateString);
    dispatch({ type: "search/setDate", payload: newDate });
  };

  const onPaymentChange = (e: RadioChangeEvent) => {
    // console.log("radio checked", e.target.value);
    setPayType(e.target.value);
    if (selectedSlot) {
      calculatePrice(selectedSlot, e.target.value);
    }
  };

  const onSlotChange = ({ target: { value } }: RadioChangeEvent) => {
    setSelectedSlot(value);
    calculatePrice(value, payType);
  };

  const calculatePrice = (slotId: number, payValueType: string) => {
    if (!item) return;
    const slot = item.slots.find(slot => slot.id == slotId);
    if (!slot) return;

    setSlotDiscountPrice(slot.discount);
    setSlotTotalPrice(slot.price);
    setPriceAfterDiscount(slot.price_after_discount);

    if (payValueType == "minimum") {
      setBookingAmount(slot.minimum_booking);
    }

    if (payValueType == "full") {
      setBookingAmount(slot.price_after_discount);
    }
  };

  useEffect(() => {
    if (payType) {
      // console.log(payType);
    }
  }, [payType]);

  useEffect(() => {
    if (item) {
      const { slots } = item;

      const filterSlots = slots.filter((slot: any) => {
        const slotStartTime = slot.slot?.start_time;
        const selectedDate = dayjs(searchDate || new Date()); // Use searchDate if available, otherwise use current date
        const currentDateTime = dayjs();
        const slotStartDateTimeString = `${selectedDate.format(
          "YYYY-MM-DD"
        )} ${slotStartTime}`;
        const slotStartDateTime = dayjs(slotStartDateTimeString);

        const isSlotTimeFuture = currentDateTime.isBefore(slotStartDateTime);

        if (isSlotTimeFuture && slot.status === "available") {
          return slot;
        }
      });

      filterSlots.sort((a, b) => {
        const timeA = dayjs(`1970-01-01T${a.slot?.start_time}`);
        const timeB = dayjs(`1970-01-01T${b.slot?.start_time}`);

        if (timeA.isBefore(timeB)) {
          return -1;
        } else if (timeA.isAfter(timeB)) {
          return 1;
        } else {
          return 0;
        }
      });

      const newSlots = filterSlots.map((slot: any) => {
        const timeString = slot.slot?.start_time;
        if (!timeString) return;
        const startTime = dayjs(`1970-01-01T${timeString}`);
        const startTimeWithFormat = startTime.format("hh:mm A");

        const endTimeString = slot.slot?.end_time;
        if (!endTimeString) return;
        const endTime = dayjs(`1970-01-01T${endTimeString}`);
        const endTimeWithFormat = endTime.format("hh:mm A");

        return {
          label: startTimeWithFormat + " - " + endTimeWithFormat,
          value: slot.id
        };
      });
      setSlots(newSlots);
    }
  }, [item, searchDate]);

  return (
    <>
      {" "}
      {isLoading ? (
        <LoginAppLoader />
      ) : (
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
                    <DatePicker
                      defaultValue={dayjs(searchDate, dateFormat)}
                      onChange={onDateChange}
                      value={searchDate}
                      format={dateFormat}
                    />
                  </Form.Item>

                  {slots.length > 0 ? (
                    <Row>
                      <Col lg={24}>
                        <Radio.Group
                          options={slots}
                          onChange={onSlotChange}
                          value={selectedSlot}
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
                      </Col>
                    </Row>
                  ) : (
                    <p className="text-red-500">কোন স্লট পাওয়া যায় নি</p>
                  )}
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
                  <Form.Item label="পরিশোধের মাধ্যম" name="pay_type">
                    <Radio.Group
                      onChange={onPaymentChange}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px"
                      }}
                      value={payType}
                      defaultValue={payType}
                    >
                      <Radio value="minimum">ন্যূনতম মূল্য</Radio>
                      <Radio value="full">সর্বমোট মূল্য</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Card style={{ width: "100%" }}>
                    <div className="flex justify-between lg:p-4 lg:text-lg text-[#EC4B15] font-bold font-hind_Siliguri">
                      <span>Slot Price</span>
                      <span>{slotTotalPrice} BDT</span>
                    </div>
                    <div className="flex justify-between lg:p-4 lg:text-lg text-[#EC4B15] font-bold font-hind_Siliguri">
                      <span>Discount Price</span>
                      <span>{slotDiscountPrice} BDT</span>
                    </div>
                    <div className="flex justify-between lg:p-4 lg:text-lg text-[#EC4B15] font-bold font-hind_Siliguri">
                      <span className="">Price After Discount</span>
                      <span>{priceAfterDiscount} BDT</span>
                    </div>
                    <div className="flex justify-between lg:p-4 lg:text-lg text-[#EC4B15] font-bold font-hind_Siliguri">
                      <span>Booking Price</span>
                      <span>{bookingAmount} BDT</span>
                    </div>
                  </Card>

                  {isLoggedIn ? (
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
                  ) : (
                    <Space direction="vertical" size="large">
                      <Link href="/login">
                        <Button
                          type="primary"
                          block
                          style={{
                            background: "#34A476",
                            border: "none"
                          }}
                        >
                          লগইন করুন
                        </Button>
                      </Link>
                      <span>অথবা</span>
                      <Link href="/register">
                        <Button
                          type="primary"
                          block
                          style={{
                            color: "#fff",
                            backgroundColor: "#EC4B15"
                          }}
                        >
                          রেজিস্টার করুন
                        </Button>
                      </Link>
                    </Space>
                  )}
                </Card>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </>
  );
};

export default BookingForm;
