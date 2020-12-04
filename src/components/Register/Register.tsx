import React, { useEffect } from "react";
import styled from "styled-components";
import { useUser } from "../../context/UserContext";
import { register } from "../../API";
import { useHistory } from "react-router-dom";

export const StyledFormWrap = styled.div`
  min-width: 350px;
  width: 90%;
  height: 400px;
  margin: auto;
  background-color: #6ec2dd;
  margin-top: 15vh;
  border-radius: 4px;
  padding-top: 20px;
  box-sizing: border-box;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 40px;

  .userPass {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 300px;
  }

  button {
    width: 150px;
    height: 45px;
    margin-top: 30px;
    border: none;
    background-color: #1750e1;
    color: white;
    cursor: pointer;
    border-radius: 12px;
    outline: none;
    font-size: 1rem;
  }

  label,
  h1 {
    color: whitesmoke;
    letter-spacing: 1px;
  }

  h1 {
    letter-spacing: 3px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    height: 34px;
    margin-top: 4px;
    outline: none;
    border: none;
    border-radius: 4px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    padding-left: 10px;
    background-color: whitesmoke;
  }

  @media only screen and (min-width: 600px) {
    width: 540px;
  }
`;

const Register = () => {
  const { userInfo, setUserInfo, setUserIn, userIn } = useUser();
  let history = useHistory();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInfo.userName !== "" && userInfo.passWord !== "") {
      register(userInfo).then((id) => {
        if (id) {
          setUserInfo({
            ...userInfo,
            currentUserId: id,
          });
          setUserIn("true");
          history.push("/join-or-create");
        } else {
          alert("That user already exists");
        }
      });
    }
    e.target.reset();
  };

  useEffect(() => {
    //@ts-ignore
    window.localStorage.setItem("userIn", userIn);
  }, [userIn]);

  return (
    <div>
      <StyledFormWrap>
        <form onSubmit={handleSubmit}>
          <h1 style={{ color: "whitesmoke" }}>Register!</h1>
          <div className="userPass">
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              name="userName"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserInfo({ ...userInfo, userName: e.target.value })
              }
            />
          </div>
          <div className="userPass">
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
    </div>
  );
};

export default Register;
