import React, { useState } from "react";
import "./Home.css";
import LocalTime from "./components/LocalTime";

function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [initialMouseY, setInitialMouseY] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Only trigger when left mouse button is pressed
      setInitialMouseY(e.clientY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (initialMouseY === null) return;

    const currentMouseY = e.clientY;
    const deltaY = currentMouseY - initialMouseY;

    if (deltaY > 50) {
      setIsUnlocked(true);
    }
  };

  const handleMouseUp = () => {
    setInitialMouseY(null);
  };

  return (
    <div className="PhoneFront flex items-center justify-center h-screen">
      {!isUnlocked ? (
        <div
          className="box-border h-5/6 w-3/12 p-4 border-8 rounded-md border-black flex flex-col justify-center items-center cursor-pointer"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Unlock Screen */}
          <div className="Time absolute top-40 ">
          <LocalTime></LocalTime>
          </div>
          <div className="swipe-indicator">Drag mouse down to unlock</div>
          
        </div>
      ) : (
        <div className="box-border h-5/6 w-3/12 p-4 border-8 rounded-md border-black">
          {/* Content after unlocking */}
          <div>About Me</div>
          <div>Project</div>
        </div>
      )}
    </div>
  );
}

export default Home;
