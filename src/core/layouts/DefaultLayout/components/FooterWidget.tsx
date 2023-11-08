import { Col, Row, Space, Typography } from "antd";
import { List } from "antd";
import Image from "next/image";
import React from "react";
import { FaMapLocation } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillPhone
} from "react-icons/ai";
import { useAppSelector } from "@/store/hooks";

const FooterWidget = () => {
  const { Title, Paragraph, Text } = Typography;

  const site = useAppSelector(state => state.site.site);

  // const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const logo = site?.logo
  //   ? `${url}/email-template-settings/public/downloadFile/${site.logo}`
  //   : "/images/logo.png";

  const items = [
    {
      name: "phone",
      text: `${site?.support_number || "-"}`,
      icon: (
        <AiFillPhone
          style={{
            alignItems: "center",
            height: "20px",
            width: "20px",
            margin: "0 10px",
            color: "#EC4B15",

            fontWeight: "bold"
          }}
        />
      )
    },
    {
      name: "email",
      text: `${site?.support_email || "-"}`,
      icon: (
        <MdEmail
          style={{
            alignItems: "center",
            height: "20px",
            width: "20px",
            margin: "0 10px",
            color: "#EC4B15",

            fontWeight: "bold"
          }}
        />
      )
    },
    {
      name: "address",
      text: `${site?.address || "-"}`,
      icon: (
        <FaMapLocation
          style={{
            alignItems: "center",
            height: "20px",
            width: "20px",
            margin: "0 10px",
            color: "#EC4B15",

            fontWeight: "bold"
          }}
        />
      )
    }
  ];

  const socials = [
    {
      name: "facebook",
      link: `${site?.facebook || "https://www.facebook.com"}`,
      icon: (
        <AiFillFacebook
          style={{
            alignItems: "center",
            height: "20px",
            width: "20px",
            margin: "0 10px",
            color: "#EC4B15",
            fontWeight: "bold"
          }}
        />
      )
    },
    {
      name: "instagram",
      link: `${site?.instagram || "https://www.instagram.com"}`,
      icon: (
        <AiFillInstagram
          style={{
            alignItems: "center",
            height: "20px",
            width: "20px",
            margin: "0 10px",
            color: "#EC4B15",
            fontWeight: "bold"
          }}
        />
      )
    },
    {
      name: "linkedin",
      link: `${site?.linkedin || "https://www.linkedin.com"}`,
      icon: (
        <AiFillLinkedin
          style={{
            alignItems: "center",
            height: "20px",
            width: "20px",
            margin: "0 10px",
            color: "#EC4B15",
            fontWeight: "bold"
          }}
        />
      )
    },
    {
      name: "twitter",
      link: `${site?.twitter || "https://www.twitter.com"}`,
      icon: (
        <AiOutlineTwitter
          style={{
            alignItems: "center",
            height: "20px",
            width: "20px",
            margin: "0 10px",
            color: "#EC4B15",
            fontWeight: "bold"
          }}
        />
      )
    }
  ];

  return (
    <>
      <div className="footerWidget">
        <Row gutter={[24, 24]}>
          {/* about us */}
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={8}>
            <Typography>
              <Title>
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={200}
                  height={100}
                  priority={true}
                  style={{ width: "200px", height: "100" }}
                />
              </Title>
              <Paragraph>
                <Text
                  style={{
                    fontSize: "16px"
                  }}
                >
                  {site?.about_us}
                </Text>
              </Paragraph>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 30px"
                }}
              >
                {socials &&
                  socials.map((item, index) => (
                    <>
                      {/* remove first part that is adding by nextjs */}
                      <a
                        href={
                          item.link.search("http") === -1
                            ? `https://${item.link}`
                            : item.link
                        }
                        rel="noopener noreferrer"
                        target="_blank"
                        key={index}
                      >
                        {item.icon}
                      </a>
                    </>
                  ))}
              </div>
            </Typography>
          </Col>

          {/* contact us */}
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={8}>
            <Typography>
              <Title level={4}>Contact Us</Title>
              <Paragraph>
                <List>
                  {items &&
                    items.map((item, index) => (
                      <List.Item key={index}>
                        <Text
                          style={{
                            fontSize: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          {item.icon}

                          {item.text}
                        </Text>
                      </List.Item>
                    ))}
                </List>
              </Paragraph>
            </Typography>
          </Col>

          {/* payment */}
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={8}>
            <Typography>
              <Title level={4}>Payments Options</Title>
              <Paragraph>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Image
                    src="/images/payment.gif"
                    alt="payment"
                    width={200}
                    height={100}
                    priority={true}
                    style={{ width: "200px", height: "100px" }}
                  />
                </Space>
              </Paragraph>
            </Typography>
          </Col>
        </Row>
      </div>
      {/* <Card  style={{
          width: "100%",
       
          backgroundColor: "white"
        }}>
           
        </Card> */}
    </>
  );
};

export default FooterWidget;
