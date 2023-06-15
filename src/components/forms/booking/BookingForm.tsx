/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Form, Radio, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import LoginAppLoader from "@/components/loader/LoginAppLoader";
import AppDatePicker from "@/lib/AppDatePicker";
import AppAxios from "@/services/AppAxios";

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

  const onFinish = (values: any) => {
    console.log("Success:", values);

    try {
      AppAxios.post("/web-confirm-booking", {
        place_slot_id: selectedSlot ? selectedSlot : null,
        date: searchDate ? format(searchDate, "yyyy-M-dd") : null,
        price: bookingAmount ? bookingAmount : 0,
        discount: slotDiscountPrice ? slotDiscountPrice : 0,
        total_price: priceAfterDiscount ? priceAfterDiscount : 0
      })
        .then(res => {
          console.log(res);
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
  const onDateChange: any = (date: Date) => {
    const newDate = new Date(date);
    dispatch({ type: "search/setDate", payload: newDate });
  };

  const onPaymentChange = (e: RadioChangeEvent) => {
    setPayType(e.target.value);
    if (selectedSlot) {
      calculatePrice(selectedSlot);
    }
  };

  const onSlotChange = ({ target: { value } }: RadioChangeEvent) => {
    setSelectedSlot(value);
    calculatePrice(value);
  };

  const calculatePrice = (slotId: number) => {
    if (!item) return;
    const slot = item.slots.find(slot => slot.id == slotId);
    if (!slot) return;

    setSlotDiscountPrice(slot.discount);
    setSlotTotalPrice(slot.price);
    setPriceAfterDiscount(slot.price_after_discount);

    if (payType == "minimum") {
      setBookingAmount(slot.minimum_booking);
    } else {
      setBookingAmount(slot.price_after_discount);
    }
  };

  useEffect(() => {
    console.log("item", item);
    if (item) {
      const { slots } = item;

      const filterSlots = slots.filter((slot: any) => {
        if (slot.status == "available") {
          return slot;
        }
      });

      const newSlots = filterSlots.map((slot: any) => {
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
                    <AppDatePicker
                      defaultValue={searchDate}
                      onChange={onDateChange}
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
                  <Form.Item label="পেমেন্ট মেথড" name="pay_type">
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
                    <div className="flex justify-between p-4 text-lg text-[#e60606] font-bold font-hind_Siliguri">
                      <span>Slot Price</span>
                      <span>{slotTotalPrice} BDT</span>
                    </div>
                    <div className="flex justify-between p-4 text-lg text-[#e60606] font-bold font-hind_Siliguri">
                      <span>Discount Price</span>
                      <span>{slotDiscountPrice} BDT</span>
                    </div>
                    <div className="flex justify-between p-4 text-lg text-[#e60606] font-bold font-hind_Siliguri">
                      <span>Price After Discount</span>
                      <span>{priceAfterDiscount} BDT</span>
                    </div>
                    <div className="flex justify-between p-4 text-lg text-[#e60606] font-bold font-hind_Siliguri">
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
                            background: "#181A2A",
                            border: "none"
                          }}
                        >
                          লগইন করুন
                        </Button>
                      </Link>
                      <span>অথবা</span>
                      <Link href="/register">
                        <Button type="primary" block danger>
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
