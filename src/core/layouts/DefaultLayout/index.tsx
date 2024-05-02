// import React, { useEffect, useState } from "react";
// import { Layout } from "antd";
// import AppHeader from "./components/AppHeader";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import AppFooter from "./AppFooter";
// import Cookies from "js-cookie";
// import AppImageLoader from "@/components/loader/AppImageLoader";
// import { useQuery } from "@tanstack/react-query";
// import { CustomerData } from "@/interfaces/CustomerData";
// import axios from "axios";
// // import AppLoader from "@/lib/AppLoader";
// interface DefaultLayoutProps {
//   children: React.ReactNode;
// }

// const DefaultLayout = ({ children }: DefaultLayoutProps) => {
//   const { Content } = Layout;
//   const auth = useAppSelector(state => state.auth);
//   const authUser = useAppSelector(state => state.auth.user);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useAppDispatch();
//   const [item, SetItem] = useState<CustomerData | null>(null);
//   console.log(item);
//   const fetchData = async () => {
//     const token = Cookies.get("token");
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//     const response = await axios.get(
//       `/api/customer/get-by-id/${authUser?.userId}`

//     );
//     return response;

//   };

//   const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
//     queryKey: ["customer-list", authUser?.userId],
//     queryFn: async () => {
//       const { data } = await fetchData();
//       return data;

//     },

//     onSuccess(data: any) {
//       if (data) {
//         SetItem(data.body);
//       }
//     },
//     onError(error: string) {
//       console.log("error", error);
//     }
//   });

//   useEffect(() => {
//     setLoading(true);

//     if (!auth.isLoggedIn) return;

//     const token = Cookies.get("token");

//     if (token) {
//       dispatch({ type: "auth/setIsLoggedIn", payload: true });

//       setLoading(false);
//     }
//   }, [dispatch, auth]);

//   useEffect(() => {
//     if (item) {
//       SetItem(item);
//     }
//   }, [item]);
//   return (
//     <>
//           {isLoading && isFetching && <AppImageLoader />}

// {isError && <div>{error.message}</div>}
//       {/* {loading && <AppImageLoader />} */}
//       {auth.isLoading && <AppImageLoader />}
//       {!loading && (
//         <Layout
//           className="layout container"
//           style={{
//             background: "#fff"
//           }}
//         >
//           <AppHeader />

//           <Content
//             style={{
//               margin: "20px",
//               minHeight: "100vh !important"
//             }}
//           >
//             {children}
//           </Content>
//           <AppFooter />
//         </Layout>
//       )}
//     </>
//   );
// };

// export default DefaultLayout;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import AppFooter from "./AppFooter";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CustomerData } from "@/interfaces/CustomerData";
// import AppLoader from "@/lib/AppLoader";
// import AppRowContainer from "@/lib/AppRowContainer";

interface DefaultLayoutProps {
  children: React.ReactNode;
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const auth = useAppSelector(state => state.auth);
  const { Content } = Layout;
  const authUser = useAppSelector(state => state.auth.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [item, SetItem] = useState<CustomerData | null>(null);
  console.log(item);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(
      `/api/customer/get-by-id/${authUser?.userId}`
    );
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["customer-list", authUser?.userId],
    queryFn: async () => {
      const { data } = await fetchData();
      return data;
    },
    onSuccess(data: any) {
      if (data) {
        SetItem(data.body);
      }
    },
    onError(error: any) {
      console.log("error", error);
    }
  });

  useEffect(() => {
    setLoading(true);

    if (!auth.isLoggedIn) return;

    const token = Cookies.get("token");

    if (token) {
      dispatch({ type: "auth/setIsLoggedIn", payload: true });

      setLoading(false);
    }
  }, [dispatch, auth]);

  useEffect(() => {
    if (item) {
      SetItem(item);
    }
  }, [item]);

  return (
    <>
      {isLoading && isFetching && <AppImageLoader />}

      {isError && <div>{error.message}</div>}
      {/* {loading && <AppImageLoader />} */}
      {auth.isLoading && <AppImageLoader />}
      {!loading && (
        <Layout
          className="layout container"
          style={{
            background: "#fff"
          }}
        >
          <AppHeader item={item} />

          <Content
            style={{
              margin: "20px",
              minHeight: "100vh !important"
            }}
          >
            {children}
          </Content>
          <AppFooter />
        </Layout>
      )}
    </>
  );
};

export default DefaultLayout;
