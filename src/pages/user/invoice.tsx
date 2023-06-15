import AppLoader from "@/lib/AppLoader";
import InvoiceList from "@/modules/invoice/InvoiceList";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Invoice = () => {
  const auth = useAppSelector(state => state.auth);

  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch({ type: "auth/setIsLoggedIn", payload: true });
    } else {
      router.push("/");
    }
  }, [router, dispatch]);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {!auth.isLoading && auth.isLoggedIn && <InvoiceList />}
    </>
  );
};

Invoice.authGuard = true;
export default Invoice;
