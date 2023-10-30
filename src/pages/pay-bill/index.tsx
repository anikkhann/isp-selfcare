import AppLoader from "@/lib/AppLoader";
import BookingList from "@/modules/booking/BookingList";

import { useAppSelector } from "@/store/hooks";

const Index = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {!auth.isLoading && auth.isLoggedIn && <BookingList />}
    </>
  );
};

export default Index;
