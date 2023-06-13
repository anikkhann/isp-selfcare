import { Button, Col, Row, Space, Typography } from "antd";
import { List } from "antd";
import Image from "next/image";
import React from "react";

const items = [
  {
    name: "phone",
    text: "+8801940301000",
    image: "/icons/phone.svg"
  },
  {
    name: "email",
    text: "info@squarefeet.xyz",
    image: "/icons/email.svg"
  },
  {
    name: "address",
    text: "14 Rd 16/A, Gulshan, Dhaka 1212, Bangladesh",
    image: "/icons/address.svg"
  }
];

const socials = [
  {
    name: "facebook",
    link: "https://www.facebook.com/squarefeet.xyz",
    image: "/icons/facebook.svg"
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/squarefeet.xyz/",
    image: "/icons/instagram.svg"
  },
  {
    name: "linkedin",
    link: "https://www.linkedin.com/company/squarefeetxyz",
    image: "/icons/linkedin.svg"
  },
  {
    name: "twitter",
    link: "https://twitter.com/squarefeetxyz",
    image: "/icons/twitter.svg"
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
                স্কয়ারফিট হচ্ছে প্রথম বাংলাদেশী কমিনিটি-ভিত্তিক ডিজিটাল
                প্রোপার্টি ম্যানেজমেন্ট প্ল্যাটফর্ম। এখান থেকে অনলাইন সার্ভিস
                চার্জ ম্যানেজ করা এবং আরো অনেক সেবার পাশাপাশি খেলার মাঠ,
                কমিউনিটি সেন্টার সহ অনেক কিছু অনলাইনে বুক করা যায় সহজে।
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
              {socials.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    margin: "0 10px"
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    height={28}
                    width={28}
                  />
                </a>
              ))}
            </div>
          </Typography>
        </Col>

        {/* contact us */}
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={8}>
          <Typography>
            <Title level={4}>যোগাযোগের তথ্য</Title>
            <Paragraph>
              <List>
                {items.map((item, index) => (
                  <List.Item key={index}>
                    <Text
                      style={{
                        fontSize: "16px"
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        height={14}
                        width={14}
                        style={{
                          marginRight: "10px"
                        }}
                      />

                      {item.text}
                    </Text>
                  </List.Item>
                ))}
              </List>
            </Paragraph>
          </Typography>
        </Col>

        {/* download */}
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={8}>
          <Typography>
            <Title level={4}>আমাদের অ্যাপটি ডাউনলোড করুন</Title>
            <Paragraph>
              <Space direction="vertical" style={{ width: "100%" }}>
                <a
                  href="https://play.google.com/store/apps/details?id=xyz.squarefeet.user"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    type="primary"
                    size="large"
                    block
                    style={{
                      backgroundColor: "#2db38b",
                      borderColor: "#2db38b",
                      color: "#fff"
                    }}
                  >
                    প্লে স্টোর
                  </Button>
                </a>

                <a href="#" rel="noreferrer">
                  <Button
                    type="primary"
                    size="large"
                    block
                    style={{
                      backgroundColor: "#2db38b",
                      borderColor: "#2db38b",
                      color: "#fff"
                    }}
                  >
                    অ্যাপেল স্টোর
                  </Button>
                </a>
              </Space>
            </Paragraph>
          </Typography>
        </Col>
      </Row>
    </div>
  );
};

export default FooterWidget;