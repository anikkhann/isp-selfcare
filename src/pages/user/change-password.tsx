import AppLoader from "@/lib/AppLoader";
import ChangePassword from "@/modules/user/ChangePassword";

import { useAppSelector } from "@/store/hooks";

const Invoice = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {!auth.isLoading && auth.isLoggedIn && <ChangePassword />}
    </>
  );
};

Invoice.authGuard = true;
export default Invoice;
