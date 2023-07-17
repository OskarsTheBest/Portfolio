import React, { useState } from 'react';
import Phoneappscreen from './Phoneappscreen';
import Phoneaboutscreen from './Phoneaboutscreen';
import Phonenewscreen from './Phonenewscreen';

function Phonescreen() {
  const [screen, setScreen] = useState('app');

  const handleSwipeRight = () => {
    if (screen === 'app') {
      setScreen('about');
    }
  };

  const handleSwipeLeft = () => {
    if (screen === 'about') {
      setScreen('app');
    }
  };

  const handleSwipeUp = () => {
    setScreen('news');
  };

  const renderScreen = () => {
    if (screen === 'app') {
      return <Phoneappscreen />;
    } else if (screen === 'about') {
      return <Phoneaboutscreen />;
    } else if (screen === 'news') {
      return <Phonenewscreen />;
    }
  };

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onTouchStart={(e) => {
        const touchStartX = e.touches[0].clientX;
        const touchStartY = e.touches[0].clientY;

        const handleTouchMove = (e: TouchEvent) => {
          const touchMoveX = e.touches[0].clientX;
          const touchMoveY = e.touches[0].clientY;

          const deltaX = touchMoveX - touchStartX;
          const deltaY = touchMoveY - touchStartY;

          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
              handleSwipeRight();
            } else {
              handleSwipeLeft();
            }
          } else if (deltaY < 0) {
            handleSwipeUp();
          }

          document.removeEventListener('touchmove', handleTouchMove);
        };

        document.addEventListener('touchmove', handleTouchMove);
      }}
    >
      {renderScreen()}
    </div>
  );
}

export default Phonescreen;
