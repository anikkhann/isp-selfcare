/* eslint-disable @next/next/no-img-element */
import React from "react";

const WorkBanner: React.FC = () => {
  return (
    <>
      <div className="w-full mx-auto overflow-x-hidden lg:max-w-7xl py-5">
        <div className="w-full mx-auto">
          <div className="max-h-[520px] relative">
            {/* overlay */}
            <div className="absolute w-full h-full  max-h-[520px] grid place-content-center bg-secondary/7 border-l-4 border-secondary  md:flex md:flex-row  flex-col justify-center md:px-14 py-5">
              <div className="md:w-1/2 w-full grid place-content-center px-1 py-3">
                <p className="md:text-2xl lg:text-3xl  text-lg uppercase font-semibold ">
                  কিভাবে কাজ করে ?
                </p>
                <p className="text-base font-medium text-gray-900">
                  বুকিং ফিচারে পেয়ে যাবেন তারিখ, নাম বা এলাকার নাম দিয়ে খেলার
                  মাঠ অথবা কমিউনিটি সেন্টারের তালিকা । তালিকা থেকে দেখতে পারবেন
                  প্রতিটি ভেন্যুর দিন এবং তারিখ অনুযায়ী ফাঁকা সময়কাল বা স্লট ।
                </p>
              </div>

              <div className="hidden md:w-1/2 md:grid md:place-content-center p-10">
                <img
                  src="/images/mobile_banner.jpg"
                  // width="500"
                  // height="500"
                  className="object-cover h-[400px]"
                  alt="mobile_banner"
                />
              </div>
            </div>

            <img
              className="w-full max-h-[500px]"
              src="/images/work_banner.jpg"
              // width="500"
              // height="500"
              alt="booking_banner"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkBanner;
