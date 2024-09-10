import React, { useEffect, useRef } from 'react';

const DrumPad = ({ sound, updateDisplay, power, volume }) => {
  const { key, id, url } = sound;
  const padRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toUpperCase() === key) {
        playSound();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [key]);

  const playSound = () => {
    if (!power) return;

    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.volume = volume; 
    audio.play();
    updateDisplay(id);
    
    padRef.current.classList.add('active'); 
    setTimeout(() => padRef.current.classList.remove('active'), 100);
  };

  return (
    <div className="drum-pad" id={id} ref={padRef} onClick={playSound}>
      {key}
      <audio className="clip" id={key} src={url}></audio>
    </div>
  );
};

export default DrumPad;
