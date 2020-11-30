import React, { FormEvent } from "react";
import styled from "styled-components";
import { useUser } from "../../context/UserContext";
import { register } from "../../API";

const StyledFormWrap = styled.div``;

const Register = () => {
  const { userInfo, setUserInfo, setCurrentUserId } = useUser();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInfo.userName !== "" && userInfo.passWord !== "") {
      register(userInfo).then((id) => setCurrentUserId(id));
    }
    e.target.reset();
  };

  return (
    <StyledFormWrap>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            name="userName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserInfo({ ...userInfo, userName: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="passWord">Password:</label>
          <input
            type="text"
            name="passWord"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserInfo({ ...userInfo, passWord: e.target.value })
            }
          />
        </div>
        <button>Register</button>
      </form>
    </StyledFormWrap>
  );
};

export default Register;
