import styled from "styled-components";

const ShareDetailContent = ({ content }) => {
  return (
    <>
      <Category>카테고리: {content.pcategory.pcategoryName}</Category>
      <Year>{content.creationDate.slice(0, 10)}</Year>
      <Body>{content.description}</Body>
    </>
  );
};
export default ShareDetailContent;

const Year = styled.div`
  color: ${(props) => props.theme.gray3};
  text-align: right;
  font-size: 1.07rem;
  font-family: "NotoSansKR-Medium";
  @media ${(props) => props.theme.mobile} {
    font-size: 0.95rem;
  }
`;
const Category = styled.div`
  color: ${(props) => props.theme.gray3};
  text-align: right;
  margin: 1rem 0 0.1rem 0rem;
  font-size: 1.09rem;
  font-family: "NotoSansKR-Medium";
  @media ${(props) => props.theme.mobile} {
    margin: 0.7rem 0 -0.25rem 0;
    font-size: 0.95rem;
  }
`;
const Body = styled.pre`
  font-size: 1.25rem;
  margin: 0.5rem 0rem;
  /* @media ${(props) => props.theme.tabletS} {
    font-size: 15px;
  } */
  @media ${(props) => props.theme.mobile} {
    margin: 0.7rem 0 -0.2rem 0;
    font-size: 1.2rem;
  }
`;
