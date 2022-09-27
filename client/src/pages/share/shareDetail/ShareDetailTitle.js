import { ReactComponent as Heart } from "../../../assets/img/icon/heart.svg"
import styled from "styled-components";


const ShareDetailTitle = ({ Detail,Data}) =>{
  return(
    <Div className="profile">
    <Div className="flexboxContainer">
      <Div className="flexbox">
        <Div className="profileimg"></Div>
        <Div className="middle">{Detail.nickname}</Div>
      </Div>
      <Div className="flexbox">
      <Div className="flexbox1">
        <Stateball status = {Detail.status}/>
        <Div className="mediumFont">{Data.status}</Div>
      </Div>
      <Div className="flexbox">
        <HeartSvg/>
        <Div className="mediumFont">{Data.favoritecount}</Div>
      </Div>
      </Div>
    </Div>
  </Div>
  )
  
}
export default ShareDetailTitle;

const Div = styled.div`

.flexboxContainer{
  display: flex;
  justify-content: space-between;
  margin: 2rem 0rem 1rem 0rem ;
}
.profile{
  display: flex;
  justify-content: space-between;

}
.profileimg{
  width: 5.31rem;
  height: 5.31rem;
  background-color:#BDBDBD;
  border-radius: 50%;
}
.middle{
  font-size: 1.875rem;
  display: flex;
  align-items: center;
  margin: 0rem 0rem 0rem 1.5rem;
}
.flexbox{
  display: flex;
  align-items: center;

  }
.flexbox1{
  display: flex;
  align-items: center;
  margin: 0rem 4rem;
}
.mediumFont{
  font-size: 1.375rem;
  margin: 0rem 0rem 0rem 0.5rem;
}
`
const Stateball = styled.div`
width: 1.75rem;
height: 1.75rem;
border-radius: 50%;
background-color: ${(props) => props.theme.stateGreen};
`
const HeartSvg = styled(Heart)`
fill:  ${(props) => props.theme.bgColor};
stroke: ${(props) => props.theme.gray4};
stroke-width:3rem;
width: 30px;
height: 28px;
`

