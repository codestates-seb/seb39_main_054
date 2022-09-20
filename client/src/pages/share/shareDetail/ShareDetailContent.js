import styled from "styled-components"

const ShareDetailContent = ({content})=>{
  return(
    <ContentDiv>
      <Year>{content.date}</Year>
      <Body>{content.content}</Body>
    </ContentDiv>
  )
}
export default ShareDetailContent

const ContentDiv = styled.div`
display: flex;
flex-direction: column;
`
const Year = styled.div`
color:  ${(props) => props.theme.gray2};
text-align: right;
margin: 0.8rem 0rem;
font-size: 1.25rem;
`
const Body = styled.div`
font-size: 1.25rem;
margin: 0.5rem 0rem;
`