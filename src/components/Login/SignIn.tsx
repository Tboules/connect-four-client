import React, { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { StyledFormWrap } from "../Register/Register";
import { signIn } from "../../API";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const { userInfo, setUserInfo, setUserIn, userIn } = useUser();
  let history = useHistory();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInfo.userName !== "" && userInfo.passWord !== "") {
      const id = await signIn(userInfo);
      if (id) {
        setUserInfo({
          ...userInfo,
          currentUserId: id,
        });
        setUserIn("true");
        history.push("/join-or-create");
      } else {
        alert("The Username or Password that you have entered is incorrect.");
      }
    }
  };

  useEffect(() => {
    // @ts-ignore
    window.localStorage.setItem("userIn", userIn);
  }, [userIn]);

  return (
    <div>
      <StyledFormWrap>
        <form onSubmit={handleSubmit}>
          <h1 style={{ color: "whitesmoke" }}>Sign In!</h1>
          <div className="userPass">
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              name="userName"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserInfo({
                  ...userInfo,
                  userName: e.target.value,
                });
                window.localStorage.setItem("userName", e.target.value);
              }}
            />
          </div>
          <div className="userPass">
            <label htmlFor="passWord">Password:</label>
            <input
              type="password"
              name="passWord"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserInfo({
                  ...userInfo,
                  passWord: e.target.value,
                });
              }}
            />
          </div>
          <button>Come On In</button>
        </form>
      </StyledFormWrap>
    </div>
  );
};

export default SignIn;
