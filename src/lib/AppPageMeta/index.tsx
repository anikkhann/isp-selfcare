import React from "react";
import PropTypes from "prop-types";
import { NextSeo } from "next-seo";

interface AppPageMetaProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
}

const defaultTitle = "SelfCare";
const defaultDescription = "SelfCare";
const defaultImage = "/images/logo.png";
const defaultSep = " | ";

const AppPageMeta = ({
  children,
  title,
  description,
  image
}: AppPageMetaProps) => {
  const theTitle = title
    ? title?.length > 48
      ? title
      : title + defaultSep + defaultTitle
    : defaultTitle;
  const theDescription = description
    ? description.substring(0, 155)
    : defaultDescription;
  const theImage = image ? image : defaultImage;

  return (
    <>
      <NextSeo
        title={theTitle}
        description={theDescription}
        openGraph={{
          url: "https://www.url.ie/a",
          title: theTitle,
          description: theDescription,
          images: [
            {
              url: theImage,
              width: 800,
              height: 600,
              alt: "SelfCare",
              type: "image/jpeg"
            }
          ],
          site_name: "SelfCare"
        }}
      />
      {children}
    </>
  );
};

export default AppPageMeta;

AppPageMeta.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};
