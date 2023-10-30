import React from "react";
import PropTypes from "prop-types";
import {
  StyledAuth,
  StyledAuthCard,
  StyledAuthCardHeader,
  StyledAuthMainContent,
  StyledAuthWrap
} from "./AuthLayout.styled";
import AppLogo from "@/lib/AppLogo";

interface IAuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
  return (
    <>
      <StyledAuth>
        <div>
          <StyledAuthWrap key={"wrap"}>
            <StyledAuthCard>
              <StyledAuthMainContent>
                <StyledAuthCardHeader>
                  <AppLogo />
                </StyledAuthCardHeader>
                {children}
              </StyledAuthMainContent>
            </StyledAuthCard>
          </StyledAuthWrap>
        </div>
      </StyledAuth>
    </>
  );
};

export default AuthLayout;

AuthLayout.propTypes = {
  children: PropTypes.node
};
