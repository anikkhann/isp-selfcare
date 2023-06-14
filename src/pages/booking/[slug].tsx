/* eslint-disable @typescript-eslint/no-explicit-any */
import AppLoader from "@/lib/AppLoader";
import BookingDetails from "@/modules/pages/BookingDetails";
import AppAxios from "@/services/AppAxios";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Details = () => {
  const router = useRouter();
  // console.log("router", router);
  const { slug } = router.query;

  const [loading, setLoading] = useState<boolean>(false);
  const [item, setItem] = useState<any>(null);

  // console.log("slug", slug);

  useEffect(() => {
    setLoading(true);
    console.log("slug", slug);
    if (slug) {
      const fetchData = async () => {
        const date = format(new Date(), "yyyy-M-dd");
        await AppAxios.get(`/booking-place-details/${slug}?date=${date}`)
          .then(res => {
            const { data } = res.data;
            console.log("data", data.item);
            setItem(data.item);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      };
      fetchData();
    }
  }, [slug]);

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        item && (
          <>
            <div className="container">
              <BookingDetails item={item} />
            </div>
          </>
        )
      )}
    </>
  );
};

export default Details;
