import React, { useState, useEffect } from "react";
import "./Home.css";
import LocalTime from "./components/LocalTime";
import MouseWrap from "./components/MouseWrap";
import $ from "jquery";
import Phoneright from "./Phoneright";

let moving = false;
let page = 1;

function Home() {
  const [backgroundImage, setBackgroundImage] = useState(
    "https://picsum.photos/480/830"
  );
  const [isRight, setisRight] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [initialMouseY, setInitialMouseY] = useState<number | null>(null);
  const [displayPhoneright, setDisplayPhoneright] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setIsLoading(false);
    };
    image.src = backgroundImage;
  }, [backgroundImage]);

  useEffect(() => {
    const animationIteration =
      "animationiteration webkitAnimationIteration mozAnimationIteration oAnimationIteration oanimationiteration";
    const transitionEnd =
      "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";

    $(".load-right").on("click", function () {
      if (moving === false) {
        moving = true;
        $(".load-right").addClass("active");
        setTimeout(function () {
          $(".load-right").one(animationIteration, function () {
            $(".load-right").removeClass("active");
            $(".load-right").one(transitionEnd, function () {
              page++;
              moving = false;
              setDisplayPhoneright(true);
            });
          });
        }, 2000);
      }
    });
  }, []);

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

  const handleBtnPress = (e: React.MouseEvent) => {
    setisRight(true);
  
  };

  return (
    <div className="PhoneFront flex items-center justify-center h-screen">
      { isRight ? (
        <Phoneright />
      ) : (

      
        <>
      
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
            <div>About Me</div>
            <div>Project</div>
          </div>
          {displayPhoneright && <Phoneright />}
        </>
      )}
      </>
        
      )}
      <button onClick={handleBtnPress}>
      <span className="load-right load-more"></span>
      </button>
      <span className="load-left load-more"></span>
    </div>
  );
}

export default Home;
