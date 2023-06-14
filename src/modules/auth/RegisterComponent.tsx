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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const RegisterComponent = () => {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const [showError, setShowError] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState([]);

  const dispatch = useAppDispatch();

  const MySwal = withReactContent(Swal);

  const phone = useAppSelector(state => state.auth.phone);

  const signInUser = async (values: any) => {
    const { name, email, password } = values;
    setLoading(true);

    try {
      AppAxios.post("/web-register", {
        name: name,
        phone: phone,
        email: email,
        password: password
      })
        .then(async response => {
          const { data } = response;

          if (data.success === false) {
            setShowError(true);
            setErrorMessage(data.message);
            return;
          }
          dispatch({ type: "auth/setIsVerified", payload: false });
          dispatch({ type: "auth/setPhone", payload: null });

          setLoading(false);
          MySwal.fire({
            title: "Success",
            text: data.message,
            icon: "success"
          }).then(() => {
            router.push("/login");
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
            email: "",
            password: ""
          }}
          onFinish={signInUser}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="নাম"
            name="name"
            className="form-field"
            rules={[
              {
                required: true,
                message: "Please Enter Your Full Name!"
              }
            ]}
          >
            <Input placeholder="Please Enter Your Full Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            className="form-field"
            rules={[
              {
                required: true,
                message: "Please enter your email!"
              }
            ]}
          >
            <Input placeholder="Please enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            className="form-field"
            rules={[
              {
                required: true,
                message: "Please input your Password!"
              }
            ]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>

          <div className="form-btn-field">
            <SignInButton type="primary" htmlType="submit">
              Login
            </SignInButton>
          </div>
        </StyledSignForm>
      </StyledSignContent>
    </StyledSign>
  );
};

export default RegisterComponent;
