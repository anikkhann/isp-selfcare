import { Button, Col, Row, Space, Typography } from "antd";
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
    text: "+8801940301000",
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
    text: "info@squarefeet.xyz",
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
    text: "14 Rd 16/A, Gulshan, Dhaka 1212, Bangladesh",
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
    link: "https://www.facebook.com/squarefeet.xyz",
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
    link: "https://www.instagram.com/squarefeet.xyz/",
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
    link: "https://www.linkedin.com/company/squarefeetxyz",
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
    link: "https://twitter.com/squarefeetxyz",
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
            <Title level={4}>যোগাযোগের তথ্য</Title>
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

                <a
                  href="https://apps.apple.com/us/app/squarefeet-platform/id1638789542"
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
