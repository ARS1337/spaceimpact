import "./App.css";
import newData from "./data/background.js";
import { useEffect, useReducer, useState } from "react";
import { cloneDeep } from "lodash";

function App() {
  const [data, setData] = useState(cloneDeep(newData));
  const [player, setPlayer] = useState({
    x: Math.floor(data.length / 2),
    y: Math.floor(0),
  });

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    let intervalFlag = setInterval(forceUpdate, 33);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      clearInterval(intervalFlag);
    };
  }, []);

  const onKeyDown = (e) => {
    let key = e.key;
    switch (key) {
      case "w":
        setPlayer((prev) => (prev.x > 0 ? { x: prev.x - 1, y: prev.y } : prev));
        break;
      case "s":
        setPlayer((prev) =>
          prev.x < data.length - 1 ? { x: prev.x + 1, y: prev.y } : prev
        );
        break;
      case "a":
        setPlayer((prev) => (prev.y > 0 ? { x: prev.x, y: prev.y - 1 } : prev));
        break;
      case "d":
        setPlayer((prev) =>
          prev.y < data[0].length - 1 ? { x: prev.x, y: prev.y + 1 } : prev
        );
        break;
      default:
    }
  };

  const shoot = () => {
    console.log("shoot called and player pos ", player);
    let tempData = cloneDeep(data);
    let newList = tempData[player.x].map((row, key) =>
      !(key % 3) ? "-" : "*"
    );
    tempData[player.x] = newList;
    setData(tempData);
  };
  return (
    <div
      className="flex items-center justify-center h-[100vh] w-[100vw] "
      onKeyDown={onKeyDown}
    >
      <div>
        {data.map((row, x) => {
          return (
            <>
              {row.map((char, y) => {
                if (x === player.x && y === player.y) {
                  return 5;
                } else if (x === player.x && !(y % 5)) {
                  return "-";
                } else {
                  return char === "-" ? "-" : char;
                }
              })}
              <br />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
