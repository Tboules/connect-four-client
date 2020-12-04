import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "./context/UserContext";

export function useLocalStorageManagement() {
  let location = useLocation();
  const { setGameId, setUserInfo } = useUser();

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/sign-in" || pathname === "/register") {
      window.localStorage.clear();
      setUserInfo({
        userName: "",
        passWord: "",
        gameInstance: "0",
        playerColor: "white",
        currentUserId: null,
      });
    }
    if (pathname === "/join-or-create") {
      setGameId("");
    }
  }, [location, setGameId, setUserInfo]);
}

type directionCheckFn = (
  twoD: string[][],
  tile: Tile,
  getNext: (tile: Tile) => Tile,
  getPrevious: (tile: Tile) => Tile
) => boolean;
type getColorFn = (arr: string[][], tile: number[]) => string | null;
type Tile = number[];

export const boardArr = [
  ["white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white"],
];

export const turnCheck = (array: string[][]) => {
  const turnObj = array.reduce(
    (
      acc: {
        redTurn: string[];
        yellowTurn: string[];
      },
      arr
    ) => {
      const red = arr.filter((item) => item === "red");
      const yellow = arr.filter((item) => item === "yellow");
      return {
        redTurn: [...acc.redTurn, ...red],
        yellowTurn: [...acc.yellowTurn, ...yellow],
      };
    },
    {
      redTurn: [],
      yellowTurn: [],
    }
  );

  const redTurn = turnObj.redTurn.length;
  const yellowTurn = turnObj.yellowTurn.length;

  return redTurn >= yellowTurn ? "yellow" : "red";
};

const getColor: getColorFn = (arr, [x, y]) => {
  if (arr[x] && arr[x][y]) {
    return arr[x][y];
  }
  return null;
};

const directionalCheck: directionCheckFn = (
  twoD,
  tile,
  getNext,
  getPrevious
) => {
  let count = 0;
  const currentColor = twoD[tile[0]][tile[1]];
  let nextPos = getNext(tile);
  let nextColor = getColor(twoD, nextPos);

  while (currentColor === nextColor) {
    count += 1;
    nextPos = getNext(nextPos);
    nextColor = getColor(twoD, nextPos);
  }

  nextPos = getPrevious(tile);
  nextColor = getColor(twoD, nextPos);

  while (currentColor === nextColor) {
    count += 1;
    nextPos = getPrevious(nextPos);
    nextColor = getColor(twoD, nextPos);
  }
  return count >= 3;
};

const left = ([x, y]: Tile) => [x, y - 1];
const right = ([x, y]: Tile) => [x, y + 1];
const top = ([x, y]: Tile) => [x - 1, y];
const bottom = ([x, y]: Tile) => [x + 1, y];
const topRight = ([x, y]: Tile) => [x - 1, y + 1];
const bottomLeft = ([x, y]: Tile) => [x + 1, y - 1];
const topLeft = ([x, y]: Tile) => [x - 1, y - 1];
const bottomRight = ([x, y]: Tile) => [x + 1, y + 1];

export function winCheck(twoD: string[][], tile: Tile) {
  return (
    directionalCheck(twoD, tile, right, left) ||
    directionalCheck(twoD, tile, top, bottom) ||
    directionalCheck(twoD, tile, topRight, bottomLeft) ||
    directionalCheck(twoD, tile, topLeft, bottomRight)
  );
}
