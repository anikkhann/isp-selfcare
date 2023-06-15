import HeroSection from "@/components/sections/HeroSection";
import PopularSection from "@/components/sections/PopularSection";
import UseBanner from "@/components/sections/UseBanner";

import WorkBanner from "@/components/sections/WorkBanner";
import React from "react";

const PopularPage = () => {
  return (
    <>
      <HeroSection />
      <PopularSection />
      <WorkBanner />
      <UseBanner />
    </>
  );
};

export default PopularPage;
