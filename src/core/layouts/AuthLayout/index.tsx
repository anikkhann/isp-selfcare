import React from "react";
import PropTypes from "prop-types";
import {
  StyledAuth,
  StyledAuthCard,
  StyledAuthCardHeader,
  StyledAuthMainContent,
  StyledAuthWelContent,
  StyledAuthWellAction,
  StyledAuthWrap
} from "./AuthLayout.styled";
import AppLogo from "@/lib/AppLogo";
import AppHeader from "../DefaultLayout/components/AppHeader";
import AppFooter from "../DefaultLayout/AppFooter";

interface IAuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
  return (
    <>
      <AppHeader />
      <StyledAuth>
        <div>
          <StyledAuthWrap key={"wrap"}>
            <StyledAuthCard>
              <StyledAuthWellAction>
                <StyledAuthWelContent>
                  <h2>Squarefeet Booking</h2>
                  <p>
                    Please Login or Register to your account to continue your
                    booking
                  </p>
                </StyledAuthWelContent>
              </StyledAuthWellAction>
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
      <AppFooter />
    </>
  );
};

export default AuthLayout;

AuthLayout.propTypes = {
  children: PropTypes.node
};
