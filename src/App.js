import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { SongsList } from './components/SongsList';
import { Player } from './components/Player';
import './App.css'

const App = () => {
  const ref = useRef(null);
  const [bgColor, setBgColor] = useState('#0B565B');
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    anime({
      targets: ref.current,
      backgroundPosition: ['0% 50%', '100% 50%'],
      duration: 20000,
      loop: true,
      easing: 'linear',
      direction: 'alternate',
    });
  }, [bgColor]);

  const onSelectSong = (song) => {
    setSelectedSong(song);
    setBgColor(song.accent);
  };

  return (
    <div
      ref={ref}
      className='flex justify-between items-start'
      style={{
        backgroundImage: `linear-gradient(270deg, ${bgColor}30, #000000, ${bgColor}30, #000000)`,
        backgroundColor: `${bgColor}`,
        backgroundPosition: '0% 50%',
        backgroundSize: '600% 600%',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <SongsList onSelectSong={onSelectSong} selectedSong={selectedSong} />
      {selectedSong && <Player selectedSong={selectedSong} />}
    </div>
  );
};

export default App;