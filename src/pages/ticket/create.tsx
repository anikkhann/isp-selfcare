import AppLoader from "@/lib/AppLoader";
import NewTicket from "@/modules/ticket/NewTicket";

import { useAppSelector } from "@/store/hooks";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      <NewTicket />
    </>
  );
};

export default Home;
