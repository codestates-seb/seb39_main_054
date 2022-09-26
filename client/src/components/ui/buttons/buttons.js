import styled from "styled-components";

export const PostBtn = styled.button`
width: 8.4375rem;
height: 4.125rem;
border-radius: 14px;
font-size: 18px;
font-family: "NotoSansKR-Medium";
background-color: ${(props) => props.theme.gray5};
color: ${props => props.theme.lightGreen};
`;