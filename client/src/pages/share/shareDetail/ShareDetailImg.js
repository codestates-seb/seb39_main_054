import styled from "styled-components";
import { ReactComponent as Left } from "../../../assets/img/icon/caret-left.svg";
import { ReactComponent as Right } from "../../../assets/img/icon/caret-right.svg";
const ShareDetailImg = ({url}) => {
  console.log(url)
  return(
    <>
  <Picture><Img src={url.image01}></Img>
  <CaretDiv><LeftBtn /><RightBtn /></CaretDiv>
  </Picture>
  
</>
  
  )
}
export default ShareDetailImg
const Picture = styled.div`
width: 56.25rem;
height: 34.375rem;
overflow: hidden;
`
const Img = styled.img`

width: 100%;
height: 100%;
border-radius: 14px;
`
const CaretDiv = styled.div`
display: flex;
position: absolute;
`
const LeftBtn = styled(Left)`
position: absolute;
width: 1.75rem;
height: 1.75rem;
fill:  ${(props) => props.theme.textColor};
top: -18.75rem

`
const RightBtn = styled(Right)`
position: absolute;
width: 1.75rem;
height: 1.75rem;
fill:  ${(props) => props.theme.textColor};
top: -18.75rem;
left :870px

`
