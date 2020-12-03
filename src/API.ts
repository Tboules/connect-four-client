import axios from "axios";

export const register = async (user: any) => {
  try {
    const registeredUser = await axios.post(
      "http://localhost:3001/api/users",
      user
    );
    const id = registeredUser.data._id;
    return id;
  } catch (err) {
    console.error(err);
  }
};

export const signIn = async (user: any) => {
  try {
    const signedInUser = await axios.post(
      "http://localhost:3001/api/users/validate",
      user
    );
    const id = signedInUser.data._id;
    return id;
  } catch (err) {
    console.error(err);
  }
};
