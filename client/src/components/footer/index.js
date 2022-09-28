import React from "react";
import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";
import { useMediaQuery } from "react-responsive";

const Footer = () => {
  const isMobile = useMediaQuery({ maxWidth: 786 });
  return <>{isMobile ? <FooterMobile /> : <FooterDesktop />}</>;
};

export default Footer;
