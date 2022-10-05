import { ReactComponent as Heart } from "../../../assets/img/icon/heart.svg";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShareDetailTitle = ({ data }) => {
  const { id } = useParams();
  console.log(data.favoriteStatus);

  // 좋아요 등록
  const favoriteClick = async () => {
    // header에 토큰값 기본으로 넣기
    axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "authorization"
    )}`;
    if (data.favoriteStatus === false) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/v1/favorites/${id}`)
        .then(() => window.location.reload())
        .catch(() => alert("로그인을 해주세요!"));
    } else {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/v1/favorites/${id}`)
        .then(window.location.reload());
    }
  };

  return (
    <Div className="profile">
      <Div className="flexboxContainer">
        <Div className="flexbox">
          <Div className="profileimg"></Div>
          <Div className="middle">{data.member.nickname}</Div>
        </Div>
        <Div className="flexbox">
          <Div className="flexbox1">
            <Stateball status={data.productStatus} />
            <Div className="mediumFont">{data.productStatus}</Div>
          </Div>
          <Div className="flexbox">
            <HeartSvg
              onClick={favoriteClick}
              favoriteStatus={data.favoriteStatus}
            />
            <Div className="mediumFont">{data.favoriteCount}</Div>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};
export default ShareDetailTitle;

const Div = styled.div`
  .flexboxContainer {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0rem 1rem 0rem;
  }
  .profile {
    display: flex;
    justify-content: space-between;
  }
  .profileimg {
    width: 5.31rem;
    height: 5.31rem;
    background-color: #bdbdbd;
    border-radius: 50%;
  }
  .middle {
    font-size: 1.875rem;
    display: flex;
    align-items: center;
    margin: 0rem 0rem 0rem 1.5rem;
  }
  .flexbox {
    display: flex;
    align-items: center;
  }
  .flexbox1 {
    display: flex;
    align-items: center;
    margin: 0rem 4rem;
  }
  .mediumFont {
    font-size: 1.375rem;
    margin: 0rem 0rem 0rem 0.5rem;
  }
`;
const Stateball = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background-color: ${(props) =>
    props.status === "대여가능"
      ? props.theme.stateGreen
      : props.status === "대여중"
      ? props.theme.stateBlue
      : props.theme.stateRed};
`;
const HeartSvg = styled(Heart)`
  fill: ${(props) => (props.favoriteStatus ? "#ED4956" : props.theme.gray4)};
  stroke-width: 3rem;
  width: 30px;
  height: 28px;
  cursor: pointer;
`;
