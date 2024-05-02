/* eslint-disable @typescript-eslint/no-explicit-any */

import DetailsProfileData from "@/components/details/profile/DetailsProfileData";
import { CustomerData } from "@/interfaces/CustomerData";
import AppLoader from "@/lib/AppLoader";
// import AppRowContainer from "@/lib/AppRowContainer";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

import React, { useEffect, useState } from "react";

const DetailsProfile = () => {
  const authUser = useAppSelector(state => state.auth.user);

  const [item, SetItem] = useState<CustomerData | null>(null);

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
    if (item) {
      SetItem(item);
    }
  }, [item]);

  return (
    <>
      {/* <AppRowContainer> */}
      {isLoading && isFetching && <AppLoader />}

      {isError && <div>{error.message}</div>}
      <Card
        style={{
          width: "100%",
          // backgroundColor: "#ECF0F1",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          margin: "0 auto",
          textAlign: "center",
          marginTop: "2rem",
          marginBottom: "2rem"
        }}
      >
        {/* customer={item} */}
        {authUser && <DetailsProfileData item={authUser} customer={item} />}
      </Card>
      {/* </AppRowContainer> */}
    </>
  );
};

export default DetailsProfile;
