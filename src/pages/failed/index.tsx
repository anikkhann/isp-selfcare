import AppLoader from "@/lib/AppLoader";
import Failed from "@/modules/failed/Failed";

import { useAppSelector } from "@/store/hooks";

const Index = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {!auth.isLoading && auth.isLoggedIn && <Failed />}
    </>
  );
};

export default Index;
