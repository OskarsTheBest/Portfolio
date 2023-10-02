import React, { useState, useEffect } from "react";
import "./Home.css";
import LocalTime from "./components/LocalTime";
import MouseWrap from "./components/MouseWrap";
import Phonescreen from "./PhoneInside/Phonescreen";
import PhoneRight from "./Phoneright";
import PhoneBack from "./Phoneback";
import PhoneLeft from "./Phoneleft";
import $ from "jquery";

function Home() {
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "https://picsum.photos/480/830"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [initialMouseY, setInitialMouseY] = useState<number | null>(null);
  let moving = false;
  let page = 0;
  
  const screens = [<Phonescreen />, <PhoneRight />, <PhoneBack />, <PhoneLeft />];
  const [currentScreen, setCurrentScreen] = useState(screens[0]);

  const animationIteration =
    "animationiteration webkitAnimationIteration mozAnimationIteration oAnimationIteration oanimationiteration";
  const transitionEnd =
    "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";

  const handleLoadClick = (direction: 'right' | 'left') => {
    if (moving === false) {
      moving = true;
      $(`.load-${direction}`).addClass("active");
      setTimeout(function () {
        $(`.load-${direction}`).one(animationIteration, function () {
          $(`.load-${direction}`).removeClass("active");
          $(`.load-${direction}`).one(transitionEnd, function () {
            if (direction === 'right') {
              page = (page + 1) % screens.length;
            } else if (direction === 'left') {
              page = (page - 1 + screens.length) % screens.length;
            }
            setCurrentScreen(screens[page]);
            moving = false;
          });
        });
      }, 2000);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      // Only trigger when the left mouse button is pressed
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

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setIsLoading(false);
    };
    image.src = backgroundImage;
  }, [backgroundImage]);

  return (
    <div className="PhoneFront flex items-center justify-center h-screen">
      {!isUnlocked ? (
        <>
          {isLoading ? (
            <div className="box-border h-5/6 w-3/12 p-4 border-8 rounded-md border-black bg-white flex flex-col justify-center items-center cursor-pointer">
              {/* Loading Animation */}
              <div className="dot-pulse"></div>
            </div>
          ) : (
            <div
              className="box-border h-5/6 w-3/12 p-4 border-8 rounded-md border-black flex flex-col justify-center items-center cursor-pointer"
              style={{ backgroundImage: `url(${backgroundImage})` }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {/* Unlock Screen */}
              <div className="Time absolute top-40 ">
                <LocalTime></LocalTime>
              </div>
              <div className=" absolute top-24">
                <MouseWrap></MouseWrap>
              </div>
              <div className="swipe-indicator"></div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="box-border h-5/6 w-3/12 p-4 border-8 rounded-md border-black bg-white">
            {/* Content after unlocking */}
            {currentScreen}
          </div>
          </>
      )}
          {/* Buttons for further actions */}
          <button onClick={() => handleLoadClick('right')}>
            <span className="load-right load-more"></span>
          </button>
          <button onClick={() => handleLoadClick('left')}>
            <span className="load-left load-more"></span>
          </button>

    </div>
  );
}

export default Home;