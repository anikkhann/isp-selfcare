import styled from "styled-components";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export const Logo = styled.img`
  display: inline-block;
  height: 50px;
  vertical-align: middle;
`;

const TitleWrapper = styled.div`
  position: relative;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  line-height: 64px;
  transition: all 0.3s;
`;

const LogoTitle = () => {
  const site = useAppSelector(state => state.site.site);

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const logo = site?.logo
    ? `${url}/email-template-settings/public/downloadFile/${site.logo}`
    : "/images/logo.png";

  return (
    <TitleWrapper>
      <Link href="/">
        <Logo src={site?.logo ? logo : "/images/logo.png"} alt="logo" />
      </Link>
    </TitleWrapper>
  );
};

export default LogoTitle;
