import AppLoader from "@/lib/AppLoader";

import UserProfile from "@/modules/user/UserProfile";

import { useAppSelector } from "@/store/hooks";

const Booking = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {!auth.isLoading && auth.isLoggedIn && <UserProfile />}
    </>
  );
};

export default Booking;
