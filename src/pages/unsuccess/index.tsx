import AppLoader from "@/lib/AppLoader";
import UnSuccess from "@/modules/unsuccess/UnSuccess";

import { useAppSelector } from "@/store/hooks";

const Index = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {!auth.isLoading && auth.isLoggedIn && <UnSuccess />}
    </>
  );
};

export default Index;
