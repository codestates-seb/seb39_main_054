import Proptypes from "prop-types";
import React from "react";
import styled from "styled-components";

export default function Validations({ value }) {
  return <StyledValidations>{value}</StyledValidations>;
}

Validations.propTypes = {
  value: Proptypes.string.isRequired,
};

const StyledValidations = styled.div`
  font-size: 0.93rem;
  color: red;
  padding: 0.7rem 0 0 0.85rem;
`;
