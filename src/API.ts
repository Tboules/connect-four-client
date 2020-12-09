import axios from "axios";

export type gameType = {
  gameInstance: string;
  messages?: {
    name: string;
    message: string;
  }[];
  gameBoard: string[][];
  lastTile: number[];
};

export const register = async (user: any) => {
  try {
    const registeredUser = await axios.post(
      "https://immense-earth-66449.herokuapp.com/api/users",
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
      "https://immense-earth-66449.herokuapp.com/api/users/validate",
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
      `https://immense-earth-66449.herokuapp.com/api/users/${currentUserId}`,
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
      "https://immense-earth-66449.herokuapp.com/api/users/checkGame",
      { gameInstance: gameId }
    );
    return gameInfo.data;
  } catch (err) {
    console.error(err);
  }
};

export const createGame = async (game: gameType) => {
  try {
    const newGame = await axios.post(
      "https://immense-earth-66449.herokuapp.com/gameApi/newGame",
      game
    );
    return newGame;
  } catch (err) {
    console.error(err);
  }
};

export const updateGame = async (gameInfo: any) => {
  try {
    const update = await axios.patch(
      "https://immense-earth-66449.herokuapp.com/gameApi/updateGame",
      gameInfo
    );
    return update;
  } catch (err) {
    console.error(err);
  }
};

export const getGame = async (id: any) => {
  try {
    const findGame = await axios.post(
      "https://immense-earth-66449.herokuapp.com/gameApi/getGame",
      {
        gameInstance: id,
      }
    );
    return findGame;
  } catch (err) {
    console.error(err);
  }
};

export const deleteGame = async (id: any) => {
  try {
    const deletedGame = await axios.delete(
      "https://immense-earth-66449.herokuapp.com/gameApi/deleteGame",
      {
        data: {
          gameInstance: id,
        },
      }
    );
    return deletedGame;
  } catch (err) {
    console.error(err);
  }
};
