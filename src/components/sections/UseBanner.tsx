/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";

import { List } from "antd";
import React from "react";

const data = [
  {
    title: "পছন্দের ভেন্যুর নাম লিখে সার্চ করে এখান থেকেই বুক করে দিতে পারবেন"
  },
  {
    title: " কোন ভেন্যু বেশি পপুলার তা দেখে নিতে পারবেন কয়েক সেকেন্ডে"
  },
  {
    title: "আপনি পাচ্ছেন পছন্দের সেই দিনে সুন্দর সব ভেন্যুর কালেকশন"
  },
  {
    title: "ওদের নয়, বরং নিজের পছন্দ মত স্লট সিলেক্ট করতে পারবেন"
  },
  {
    title: "আংশিক টাকা পরিশোধ করে স্লট সিলেক্ট করতে পারবেন"
  },
  {
    title: "চাইলে এলাকার কাছে খুঁজতে পারবেন ভেন্যু"
  },
  {
    title: "রিভিউ পড়ে নিতে পারবেন সিদ্ধান্ত"
  }
];

const UseBanner: React.FC = () => {
  return (
    <>
      <div className="w-full mx-auto overflow-x-hidden lg:max-w-7xl py-6 ">
        <div className="w-full mx-auto">
          <div className="max-h-[520px]">
            <div className="w-full h-full  max-h-[520px] grid place-content-center bg-white bg-secondary/7 border-r-4 border-secondary  md:flex md:flex-row md:justify-between flex-col justify-center md:px-14 py-5">
              <div>
                <img
                  src="/images/use_banner.png"
                  className="w-full h-full object-cover px-3 mt-10"
                  alt="Use Banner"
                />
              </div>
              <div className="md:w-1/2 w-full">
                <h1 className="md:text-2xl text-center lg:text-3xl text-danger text-xl uppercase font-semibold ">
                  ব্যবহারে আপনার লাভ কি?
                </h1>

                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item, index) => (
                    <List.Item key={index}>
                      <List.Item.Meta
                        avatar={
                          <img
                            src="/icons/right_sign.svg"
                            className=""
                            alt="right_sign"
                          ></img>
                        }
                        title={<a href="https://ant.design">{item.title}</a>}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UseBanner;
