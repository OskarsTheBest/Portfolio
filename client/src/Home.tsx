import React, { useState, useEffect, useCallback } from "react";
import "./Home.css";
import LocalTime from "./components/LocalTime";
import MouseWrap from "./components/MouseWrap";
import $ from "jquery";
import Phoneright from "./Phoneright";
import Phoneleft from "./Phoneleft";
import Phoneback from "./Phoneback";
import Phonescreen from "./PhoneInside/Phonescreen";

let moving = false;
let page = 0;

function Home() {
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "https://picsum.photos/480/830"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [initialMouseY, setInitialMouseY] = useState<number | null>(null);
  const [displayPhoneright, setDisplayPhoneright] = useState(false);
  const [displayPhoneleft, setDisplayPhoneleft] = useState(false);
  const [displayPhoneback, setDisplayPhoneback] = useState(false);

  const handleRightButtonClick = useCallback(() => {
    if (moving === false) {
      moving = true;
      $(".load-right").addClass("active");
      setTimeout(function () {
        $(".load-right").one("animationiteration webkitAnimationIteration mozAnimationIteration oAnimationIteration oanimationiteration", function () {
          $(".load-right").removeClass("active");
          $(".load-right").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () {
            if (page === 0) {
              setDisplayPhoneright(true);
              setDisplayPhoneleft(false);
              setDisplayPhoneback(false);
              page++;
            } else if (page === 1) {
              setDisplayPhoneback(true);
              setDisplayPhoneright(false);
              setDisplayPhoneleft(false);
              page++;
            } else {
              setDisplayPhoneright(true);
              setDisplayPhoneleft(false);
              setDisplayPhoneback(false);
            }
            moving = false;
          });
        });
      }, 2000);
    }
  }, [page]);

  const handleLeftButtonClick = useCallback(() => {
    if (moving === false) {
      moving = true;
      $(".load-left").addClass("active");
      setTimeout(function () {
        $(".load-left").one("animationiteration webkitAnimationIteration mozAnimationIteration oAnimationIteration oanimationiteration", function () {
          $(".load-left").removeClass("active");
          $(".load-left").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () {
            if (page === 0) {
              setDisplayPhoneleft(true);
              setDisplayPhoneback(false);
              setDisplayPhoneright(false);
              page--;
            } else if (page === 1) {
              setDisplayPhoneright(false);
              setDisplayPhoneleft(false);
              setDisplayPhoneback(false);
              page--;
            } else {
              setDisplayPhoneback(true);
              setDisplayPhoneright(false);
              setDisplayPhoneleft(false);
            }
            moving = false;
          });
        });
      }, 2000);
    }
  }, [page]);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setIsLoading(false);
    };
    image.src = backgroundImage;
  }, [backgroundImage]);

  useEffect(() => {
    $(".load-right").on("click", handleRightButtonClick);

    return () => {
      $(".load-right").off("click", handleRightButtonClick);
    };
  }, [handleRightButtonClick]);

  useEffect(() => {
    $(".load-left").on("click", handleLeftButtonClick);

    return () => {
      $(".load-left").off("click", handleLeftButtonClick);
    };
  }, [handleLeftButtonClick]);

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
    //TODO:
    //FIX THE BUTTONS
  return (
    <div className="PhoneFront flex items-center justify-center h-screen">
      {page === 0 && !isUnlocked ? (
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
      ) : page === 0 && isUnlocked ? (
        <>
          <div className="box-border h-5/6 w-3/12 p-4 border-8 rounded-md border-black bg-white">
            {/* Content after unlocking */}
            <Phonescreen></Phonescreen>
          </div>
          {displayPhoneright && <Phoneright />}
        </>
      ) : page === 1 ? (
        <>
          {displayPhoneleft && <Phoneleft />}
          {displayPhoneback && <Phoneback />}
        </>
      ) : (
        <>
          {displayPhoneright && <Phoneright />}
        </>
      )}
      <button onClick={handleRightButtonClick}>
          <span className="load-right load-more"></span>
      </button>
      <button onClick={handleLeftButtonClick}>
          <span className="load-left load-more"></span>
      </button>
    </div>
  );
}

export default Home;
