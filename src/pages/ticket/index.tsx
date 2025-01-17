import AppLoader from "@/lib/AppLoader";
import TicketList from "@/modules/ticket/TicketList";

import { useAppSelector } from "@/store/hooks";

const Index = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {!auth.isLoading && auth.isLoggedIn && <TicketList />}
    </>
  );
};

export default Index;
