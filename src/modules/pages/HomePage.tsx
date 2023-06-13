import HeroSection from "@/components/sections/HeroSection";
import SearchResult from "@/components/sections/SearchResult";
import SearchSection from "@/components/sections/SearchSection";
import UseBanner from "@/components/sections/UseBanner";

import WorkBanner from "@/components/sections/WorkBanner";
import React from "react";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <SearchResult />
      <WorkBanner />
      <UseBanner />
    </>
  );
};

export default HomePage;
