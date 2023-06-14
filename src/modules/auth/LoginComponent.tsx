/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Alert, Button, Form, Input, Space } from "antd";

import {
  SignInButton,
  StyledSign,
  StyledSignContent,
  StyledSignForm
} from "./index.styled";
import { useRouter } from "next/router";
import AppAxios from "@/services/AppAxios";
import Cookies from "js-cookie";
import LoginAppLoader from "@/components/loader/LoginAppLoader";
import { useAppDispatch } from "@/store/hooks";
import Link from "next/link";
import { getUserInfo } from "@/store/features/auth/AuthSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const LoginComponent = () => {
  const MySwal = withReactContent(Swal);

  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const [showError, setShowError] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState([]);

  const dispatch = useAppDispatch();

  const signInUser = async (values: any) => {
    const { email, password } = values;
    setLoading(true);

    try {
      AppAxios.post("/web-login", {
        username: email,
        password: password
      })
        .then(async response => {
          const { data } = response;

          if (data.success === false) {
            setShowError(true);
            setErrorMessage(data.message);
            setLoading(false);
            return;
          }

          Cookies.set("token", data.data.token);

          dispatch({ type: "auth/setIsLoggedIn", payload: true });

          dispatch(getUserInfo());

          setLoading(false);

          MySwal.fire({
            title: "Success",
            text: data.message,
            icon: "success"
          }).then(() => {
            router.push("/");
          });
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
            remember: false,
            email: "",
            password: ""
          }}
          onFinish={signInUser}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="মোবাইল"
            name="email"
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

          <Form.Item
            name="password"
            label="পাসওয়ার্ড"
            className="form-field"
            rules={[
              {
                required: true,
                message: "Please enter your Password!"
              }
            ]}
          >
            <Input.Password placeholder="Please enter your Password" />
          </Form.Item>

          <div className="form-btn-field">
            <SignInButton type="primary" block htmlType="submit">
              Login
            </SignInButton>
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "10px"
            }}
          >
            OR
          </div>

          <Space direction="vertical" style={{ width: "100%" }}>
            <Link href="/register">
              <Button type="primary" block danger>
                Register
              </Button>
            </Link>
          </Space>
        </StyledSignForm>
      </StyledSignContent>
    </StyledSign>
  );
};

export default LoginComponent;
