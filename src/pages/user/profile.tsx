import AppLoader from "@/lib/AppLoader";

import DetailsProfile from "@/modules/user/DetailsProfile";

import { useAppSelector } from "@/store/hooks";

const Booking = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {!auth.isLoading && auth.isLoggedIn && <DetailsProfile />}
    </>
  );
};

export default Booking;
