import randomColor from "randomcolor";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import "./App.css";

const App = () => {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const setNewItem = () => {
    if (item !== "") {
      const newItem = {
        id: Date.now(),
        item,
        color: randomColor({
          luminosity: "light",
        }),
        defaultPos: {
          x: 630,
          y: -450,
        },
      };
      setItem("");
      setItems((items) => [...items, newItem]);
    } else {
      alert("Enter something...");
      setItem("");
    }
  };

  const deleteItem = (id) => {
    setItems([...items.filter((thisItem) => thisItem.id !== id)]);
  };

  const updatePos = (data, index) => {
    const newArr = [...items];
    newArr[index].defaultPos = {
      x: data.x,
      y: data.y,
    };
    setItems(newArr);
  };

  const keyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      setNewItem();
    }
  };

  return (
    <div className="app">
      <div className="wrapper">
        <input
          value={item}
          type="text"
          className="text"
          placeholder="Enter something..."
          onChange={(e) => setItem(e.target.value)}
          onKeyPress={keyPress}
        />
        <button className="enter" onClick={() => setNewItem()}>
          ENTER
        </button>
      </div>

      {items.map((item, index) => (
        <Draggable
          defaultPosition={item.defaultPos}
          onStop={(_, data) => {
            updatePos(data, index);
          }}
          key={item.id}
        >
          <div className="todo-item" style={{ backgroundColor: item.color }}>
            {item.item}
            <button
              onClick={() => deleteItem(item.id)}
              className="delete"
              style={{ border: `1px solid ${item.color}` }}
            >
              X
            </button>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default App;
