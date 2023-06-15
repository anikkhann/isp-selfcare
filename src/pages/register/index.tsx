import AuthLayout from "@/core/layouts/AuthLayout";
import AppLoader from "@/lib/AppLoader";
import RegisterComponent from "@/modules/auth/RegisterComponent";
import { useAppSelector } from "@/store/hooks";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const token = Cookies.get("token");

  const [loading, setLoading] = useState(true);

  const isVerified = useAppSelector(state => state.auth.isVerified);

  const SendOtp = useAppSelector(state => state.auth.SendOtp);

  useEffect(() => {
    if (token) {
      router.replace("/");
      setLoading(false);
    } else {
      !isVerified && SendOtp && router.replace("/otp-check");
      !SendOtp && !isVerified && router.replace("/otp");
    }

    setLoading(false);
  }, [router, token, isVerified, SendOtp]);

  return (
    <>
      {loading && <AppLoader />}
      <RegisterComponent />
    </>
  );
};

LoginPage.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
export default LoginPage;