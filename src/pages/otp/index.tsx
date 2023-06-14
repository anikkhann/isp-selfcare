import AuthLayout from "@/core/layouts/AuthLayout";
import AppLoader from "@/lib/AppLoader";

import OtpComponent from "@/modules/auth/OtpComponent";
import { useAppSelector } from "@/store/hooks";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";

const OtpPage = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(true);

  const SendOtp = useAppSelector(state => state.auth.SendOtp);
  const isVerified = useAppSelector(state => state.auth.isVerified);

  useEffect(() => {
    if (token) {
      router.replace("/");
      setLoading(false);
    } else {
      SendOtp && router.replace("/otp-check");
      isVerified && router.replace("/register");
    }
    setLoading(false);
  }, [router, token, SendOtp, isVerified]);

  return (
    <>
      {loading && <AppLoader />}
      <OtpComponent />
    </>
  );
};

OtpPage.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
export default OtpPage;
