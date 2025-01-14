import { ReactElement, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import axios from "axios";
import { UserLoggedInData } from "@/store/features/auth/AuthSlice";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}
// props: AuthGuardProps

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;
  const auth = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const getSiteData = async (user: UserLoggedInData) => {
    await axios
      .get(
        `/api/email-template-settings/get-client-general-info/${user.partnerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => {
        if (response.data.status == "200") {
          dispatch({ type: "site/setSiteData", payload: response.data.body });
        }
        // console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // // console.log("auth", auth);
  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    const initAuth = async () => {
      dispatch({ type: "auth/setInitialized", payload: true });
      if (!router.isReady) {
        return;
      }

      if (!token || token === "undefined") {
        router.replace("/login");
        dispatch({ type: "auth/setIsLoading", payload: false });
      }
      if (token) {
        await axios
          .get("/api/api/v1/auth/get", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            // console.log(response.data);
            if (response.data.status == "401") {
              Cookies.remove("token");
              router.replace("/login");
            }
            getSiteData(response.data);
            dispatch({ type: "auth/setIsLoggedIn", payload: true });
            dispatch({ type: "auth/setUser", payload: response.data });
          })
          .catch(error => {
            console.log(error);
            if (error.response) {
              if (
                error.response.status === 401 ||
                error.response.status == "500"
              ) {
                Cookies.remove("token");
                router.replace("/login");
              }
            } else {
              Cookies.remove("token");
              router.replace("/login");
            }
          });
        dispatch({ type: "auth/setIsLoading", payload: false });
      } else {
        router.replace("/login");
        dispatch({ type: "auth/setIsLoading", payload: false });
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // // console.log(auth.isLoading, auth.isInitialized);

  if (auth.isLoading || !auth.isInitialized) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
