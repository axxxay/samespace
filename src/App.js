import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { SongsList } from './components/SongsList';
import { Player } from './components/Player';
import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgess: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE'
}

const App = () => {
  const ref = useRef(null);
  const [searchInput, setSearchInput] = useState('');
  const [songsList, setSongsList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const [bgColor, setBgColor] = useState('#0B565B');
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    setApiStatus(apiStatusConstants.inProgess);
    setSelectedSong(null);
    setBgColor('#0B565B');
    const delayDebounceFn = setTimeout(() => {
        fetchSongs();
    }, 500);

      return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  const fetchSongs = async () => {
      try {
          setApiStatus(apiStatusConstants.inProgess);
          const url = `${process.env.REACT_APP_SONGS_API_URL}?search=${searchInput}`;
          const response = await fetch(url);
          if (response.ok === true) {
              const data = await response.json();
              console.log(data.data);
              setSongsList(data.data);
              setApiStatus(apiStatusConstants.success);
          } else {
              console.error('Error fetching songs');
              setApiStatus(apiStatusConstants.failure);
          }
      } catch (error) {
          console.error(error);
          setApiStatus(apiStatusConstants.failure);
      }
  }

  const onClickNext = () => {
    const currentIndex = songsList.findIndex(song => song.id === selectedSong.id);
    if (currentIndex === songsList.length - 1) {
      setSelectedSong(songsList[0]);
    } else {
      setSelectedSong(songsList[currentIndex + 1]);
    }
  }

  const onClickPrevious = () => {
    const currentIndex = songsList.findIndex(song => song.id === selectedSong.id);
    if (currentIndex === 0) {
      setSelectedSong(songsList[songsList.length - 1]);
    } else {
      setSelectedSong(songsList[currentIndex - 1]);
    }
  }

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
      <SongsList onSelectSong={onSelectSong} selectedSong={selectedSong} searchInput={searchInput} setSearchInput={setSearchInput} songsList={songsList} apiStatus={apiStatus} fetchSongs={fetchSongs} />
      {selectedSong && <Player selectedSong={selectedSong} onClickNext={onClickNext} onClickPrevious={onClickPrevious} />}
    </div>
  );
};

export default App;