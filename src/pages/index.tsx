import AppLoader from "@/lib/AppLoader";
import UserDashboard from "@/modules/dashboard/UserDashboard";

import { useAppSelector } from "@/store/hooks";

const Index = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {!auth.isLoading && auth.isLoggedIn && <UserDashboard />}
    </>
  );
};

export default Index;
