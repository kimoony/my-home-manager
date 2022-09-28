import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { loginState, modalState } from "../../atoms";
import { ListContainer } from "../../styles/list/WishList.style";
import { useNavigate } from "react-router-dom";

function WishList({ userObj, getWish, changed, setChanged }) {
  const isLogIn = useRecoilValue(loginState);
  const [onModal, setOnModal] = useRecoilState(modalState);

  const navigate = useNavigate();

  const isLogedInWish = () => {
    if (isLogIn) {
      navigate("/wish-post");
    } else {
      setOnModal(true);
    }
  };

  return (
    <div style={{ height: "95%", overflow: "auto" }}>
      {isLogIn ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "60px",
          }}
        >
          {getWish.length > 0 ? (
            getWish.map((item) =>
              userObj.uid === item.creatorId ? (
                <ListContainer key={item.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                    onClick={() => navigate(`wish-detail/${item.id}`)}
                  >
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                    <span>{item.createDate}</span>
                  </div>
                  <div>
                    <button style={{ marginLeft: "25px", marginRight: "10px" }}>
                      삭제
                    </button>
                    <button
                      onClick={() => navigate(`/wish-detail/${item.id}/edit`)}
                    >
                      수정
                    </button>
                  </div>
                </ListContainer>
              ) : null
            )
          ) : (
            <button onClick={isLogedInWish}>등록하기</button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default WishList;
