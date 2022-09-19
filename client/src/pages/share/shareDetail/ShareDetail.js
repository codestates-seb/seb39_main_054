import styled from "styled-components";

const ShareDetail = () => {
 
  return (
    <>
      <ShareContainer>
        <Container>
          <Title>{}</Title>
          <Picture><img src=""></img></Picture>
        </Container>
      </ShareContainer>
    </>
  );
};

export default ShareDetail;

const ShareContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
display: flex;
flex-direction: column;
`
const Title = styled.div`
font-size: 48px;
`
const Picture = styled.div`
`
