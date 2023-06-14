/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Alert, Form, Input } from "antd";

import {
  SignInButton,
  StyledSign,
  StyledSignContent,
  StyledSignForm
} from "./index.styled";
import { useRouter } from "next/router";
import AppAxios from "@/services/AppAxios";
import LoginAppLoader from "@/components/loader/LoginAppLoader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const SendOtpComponent = () => {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const [showError, setShowError] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState([]);

  const phone = useAppSelector(state => state.auth.phone);

  const dispatch = useAppDispatch();

  const signInUser = async (values: any) => {
    const { otp } = values;
    setLoading(true);

    try {
      AppAxios.post("/web-otp-check", {
        otp: otp,
        phone: phone
      })
        .then(async response => {
          const { data } = response;

          if (data.success === false) {
            setShowError(true);
            setErrorMessage(data.message);
            return;
          }

          dispatch({ type: "auth/setSendOtp", payload: false });
          dispatch({ type: "auth/setIsVerified", payload: true });

          router.push("/register");
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          setShowError(true);
          setErrorMessage(err.response.data.message);

          // if (err.response.status === 401) {
          // setErrorMessage(err.response.data.message)
          // } else {
          // setErrorMessage('Something went wrong. Please try again later.')
          // }
        });
    } catch (err) {
      console.log(err);
      /*  setShowError(true)
       setErrorMessage(err) */
    }

    console.log("Success:");

    return false;
  };

  const onFinishFailed = () => {
    console.log("Failed:");
  };

  return loading ? (
    <LoginAppLoader />
  ) : (
    <StyledSign>
      <StyledSignContent>
        <div>
          {showError && (
            <Alert
              message={errorMessage}
              type="error"
              showIcon
              style={{ marginBottom: "10px" }}
            />
          )}
        </div>

        <StyledSignForm
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true
          }}
          onFinish={signInUser}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="OTP Code"
            name="otp"
            className="form-field"
            rules={[
              {
                required: true,
                message: "Please enter your otp!"
              }
            ]}
          >
            <Input placeholder="Please enter your otp" />
          </Form.Item>

          <div className="form-btn-field">
            <SignInButton type="primary" htmlType="submit">
              Verify
            </SignInButton>
          </div>
        </StyledSignForm>
      </StyledSignContent>
    </StyledSign>
  );
};

export default SendOtpComponent;
