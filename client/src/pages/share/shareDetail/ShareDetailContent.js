import styled from "styled-components"

const ShareDetailContent = ({content})=>{
  return(
    <>
      <Year>{content.creationDate.slice(0,10)}</Year>
      <Body>{content.description}</Body>
      </>

  )
}
export default ShareDetailContent

const Year = styled.div`
color:  ${(props) => props.theme.gray2};
text-align: right;
margin: 0.8rem 0rem;
font-size: 1.25rem;
`
const Body = styled.pre`
font-size: 1.25rem;
margin: 0.5rem 0rem;
`