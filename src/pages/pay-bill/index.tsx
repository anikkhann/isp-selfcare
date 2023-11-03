import AppLoader from "@/lib/AppLoader";
import PayBillList from "@/modules/pay-bill/PayBillList";

import { useAppSelector } from "@/store/hooks";

const Index = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {!auth.isLoading && auth.isLoggedIn && <PayBillList />}
    </>
  );
};

export default Index;
