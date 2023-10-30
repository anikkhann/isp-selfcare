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

const items = [
  {
    name: "phone",
    text: "+880 1711 111 111",
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
    text: "info@test.com.bd",
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
    text: "Dhaka, Bangladesh",
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
    link: "https://www.facebook.com",
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
    link: "https://www.instagram.com",
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
    link: "https://www.linkedin.com",
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
    link: "https://twitter.com",
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

const FooterWidget = () => {
  const { Title, Paragraph, Text } = Typography;

  return (
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
                height={200}
              />
            </Title>
            <Paragraph>
              <Text
                style={{
                  fontSize: "16px"
                }}
              >
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
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
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      margin: "0 10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {item.icon}
                  </a>
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
                  height={200}
                />
              </Space>
            </Paragraph>
          </Typography>
        </Col>
      </Row>
    </div>
  );
};

export default FooterWidget;
