import React, { useState, useEffect } from 'react';
import DrumPad from './components/DrumPad';
import Display from './components/Display';
import './App.css';

const sounds = [
  { key: 'Q', id: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', id: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', id: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', id: 'Kick-n\'-Hat', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
];

function App() {
  const [displayText, setDisplayText] = useState('');
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(0.5);

  const handleDisplay = (text) => {
    if (power) {
      setDisplayText(text);
    }
  };

  const togglePower = () => {
    setPower(!power);
    setDisplayText(power ? '' : 'Power On');
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    setDisplayText(`Volume: ${Math.round(e.target.value * 100)}`);
    setTimeout(() => setDisplayText(''), 1000); // Clear display after showing volume
  };

  return (
    <div id="drum-machine">
      <div className="controls">
        <button id="power-button" onClick={togglePower}>
          {power ? 'Turn Off' : 'Turn On'}
        </button>
        <input
          type="range"
          id="volume-slider"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <Display displayText={displayText} />
      <div className="pads-container">
        {sounds.map(sound => (
          <DrumPad 
            key={sound.key} 
            sound={sound} 
            updateDisplay={handleDisplay} 
            power={power} 
            volume={volume}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
