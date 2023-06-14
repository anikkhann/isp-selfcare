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
import { useAppDispatch } from "@/store/hooks";

const OtpComponent = () => {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const [showError, setShowError] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState([]);

  const dispatch = useAppDispatch();

  const signInUser = async (values: any) => {
    const { mobile } = values;
    setLoading(true);

    try {
      AppAxios.post("/web-send-otp", {
        phone: mobile
      })
        .then(async response => {
          const { data } = response;

          if (data.success === false) {
            setShowError(true);
            setErrorMessage(data.message);
            return;
          }

          dispatch({ type: "auth/setPhone", payload: mobile });
          dispatch({ type: "auth/setSendOtp", payload: true });

          router.replace("/otp-check");
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
            remember: true,
            mobile: ""
          }}
          onFinish={signInUser}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="মোবাইল (ex: 017XXXXXXXX)"
            name="mobile"
            className="form-field"
            rules={[
              {
                required: true,
                message: "Please enter your mobile!"
              }
            ]}
          >
            <Input placeholder="Please enter your mobile" />
          </Form.Item>

          <div className="form-btn-field">
            <SignInButton type="primary" htmlType="submit">
              Send OTP
            </SignInButton>
          </div>
        </StyledSignForm>
      </StyledSignContent>
    </StyledSign>
  );
};

export default OtpComponent;
