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

export const storeGameId = async (user: any) => {
  const { currentUserId } = user;
  try {
    const storeUserId = await axios.patch(
      `http://localhost:3001/api/users/${currentUserId}`,
      user
    );
    return storeUserId;
  } catch (err) {
    console.error(err);
  }
};

export const checkGame = async (gameId: string) => {
  try {
    const gameInfo = await axios.post(
      "http://localhost:3001/api/users/checkGame",
      { gameInstance: gameId }
    );
    return gameInfo.data;
  } catch (err) {
    console.error(err);
  }
};
