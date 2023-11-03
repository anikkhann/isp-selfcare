import AppLoader from "@/lib/AppLoader";
import TroubleshootList from "@/modules/troubleshoot/TroubleshootList";

import { useAppSelector } from "@/store/hooks";

const Index = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {!auth.isLoading && auth.isLoggedIn && <TroubleshootList />}
    </>
  );
};

export default Index;
