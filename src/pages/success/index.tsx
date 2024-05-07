import AppLoader from "@/lib/AppLoader";
import Success from "@/modules/success/Success";

import { useAppSelector } from "@/store/hooks";

const Index = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {!auth.isLoading && auth.isLoggedIn && <Success />}
    </>
  );
};

export default Index;
