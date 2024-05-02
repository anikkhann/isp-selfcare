/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Alert, Form, Input } from "antd";

import {
  SignInButton,
  StyledSign,
  StyledSignContent,
  StyledSignForm
} from "./index.styled";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import LoginAppLoader from "@/components/loader/LoginAppLoader";
import { useAppDispatch } from "@/store/hooks";
// import axios from "axios";

import axios from "axios";

const LoginComponent = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const [showError, setShowError] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<any>(null);

  const { returnUrl } = router.query;

  const dispatch = useAppDispatch();

  const signInUser = async (values: any) => {
    setShowError(false);
    setErrorMessage(null);
    const { email, password } = values;
    setLoading(true);

    try {
      axios
        .post("/api/api/v1/customer/auth/authenticate", {
          email: email,
          password: password
        })
        .then(async response => {
          const { data } = response;

          console.log(data);
          if (data.success === false) {
            setShowError(true);
            setErrorMessage(data.message);
            return;
          }

          Cookies.set("token", data.token);

          dispatch({ type: "auth/setIsLoggedIn", payload: true });

          setLoading(false);
          if (returnUrl) {
            router.replace(returnUrl as string);
          } else {
            router.replace("/");
          }
        })
        .catch(err => {
          // console.log(err);
          setLoading(false);
          setShowError(true);
          setErrorMessage(err.response.data.message);

          if (err.response.status === 400) {
            setErrorMessage(err.response.data.message);
          } else {
            setErrorMessage(["Something went wrong, please try again later"]);
          }
        });
    } catch (err) {
      // console.log(err);
      setShowError(true);
      setErrorMessage(err);
    }

    // // console.log("Success:");
    // return false;
  };

  const onFinishFailed = () => {
    // console.log("Failed:");
  };

  return loading ? (
    <LoginAppLoader />
  ) : (
    <StyledSign>
      <StyledSignContent>
        <div>
          {showError && errorMessage && (
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
            email: "talib",
            password: "123456"
          }}
          onFinish={signInUser}
          onFinishFailed={onFinishFailed}
          style={{ fontWeight: "bold" }}
        >
          <Form.Item
            label="Username"
            name="email"
            className="form-field text-xl"
            rules={[
              {
                required: true,
                message: "Please input your Username!"
              },
              {
                pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                message:
                  "Only letters, numbers, underscores and hyphens allowed."
              }
            ]}
          >
            <Input placeholder="Username" maxLength={32} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            className="form-field text-xl"
            rules={[
              {
                required: true,
                message: "Please input your Password!"
              },
              {
                pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                message:
                  "Only letters, numbers, underscores and hyphens allowed"
              }
            ]}
          >
            <Input.Password placeholder="Password" maxLength={32} />
          </Form.Item>

          <div className="form-btn-field">
            <SignInButton
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#4776e6",
                background:
                  "-webkit-linear-gradient(to right, #4776e6, #8e54e9)",
                fontWeight: "bold"
              }}
            >
              Login
            </SignInButton>
          </div>
        </StyledSignForm>
      </StyledSignContent>
    </StyledSign>
  );
};

export default LoginComponent;
