import AppLoader from "@/lib/AppLoader";
import UsageList from "@/modules/usage/UsageList";

import { useAppSelector } from "@/store/hooks";

const Index = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {!auth.isLoading && auth.isLoggedIn && <UsageList />}
    </>
  );
};

export default Index;
