/* eslint-disable @typescript-eslint/no-explicit-any */
import AppLoader from "@/lib/AppLoader";
import BookingDetails from "@/modules/pages/BookingDetails";
import { getPlaceDetails } from "@/store/features/booking/placeDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Details = () => {
  const router = useRouter();
  // console.log("router", router);
  const { slug } = router.query;

  const searchDate = useAppSelector(state => state.search.date);

  const item = useAppSelector(state => state.placeDetails.item);

  const isLoading = useAppSelector(state => state.placeDetails.isLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (slug) {
      const data = {
        date: format(searchDate, "yyyy-MM-dd"),
        id: slug as string
      };
      dispatch(getPlaceDetails(data));
    }
  }, [slug, searchDate, dispatch]);

  return (
    <>
      {isLoading ? (
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
