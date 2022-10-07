import styled from "styled-components";

export const PostBtn = styled.button`
  width: 8.4375rem;
  height: 4.125rem;
  border-radius: 14px;
  font-size: 18px;
  font-family: "NotoSansKR-Medium";
  background-color: ${(props) => props.theme.gray5};
  color: ${(props) => props.theme.lightGreen};

  @media ${(props) => props.theme.mobile} {
    width: 6.25rem;
    height: 2.5rem;
    font-size: 1rem;
    margin: 0.5rem 0;
  }
`;
