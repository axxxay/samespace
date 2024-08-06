import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { FaEllipsisH } from 'react-icons/fa';
import { HiMiniPlay, HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import { TbPlayerPauseFilled } from "react-icons/tb";
import './style.css';

export const Player = ({selectedSong, onClickNext, onClickPrevious}) => {

  return (
    <div className='w-full h-[100vh] md:w-1/2 flex flex-col justify-center items-center p-6'>
      <div className='w-full max-w-[400px]'>
        <h1 className='text-white text-[32px] leading-9 font-bold font-[inter]'>{selectedSong.name}</h1>
        <p className='text-[#ffffff] opacity-60 text-base font-[inter] mt-1 mb-6'>{selectedSong.artist}</p>
        <img src={`https://cms.samespace.com/assets/${selectedSong.cover}`} alt={selectedSong.name} draggable={false} className='w-full h-[460px] max-w-[400px] max-h-[430px] rounded-lg mt-6' />

        <AudioPlayer
          src={selectedSong ? selectedSong.url : ''}
          customIcons={{
            play: <div className='bg-white rounded-[50%] h-10 w-10 flex justify-center items-center'><HiMiniPlay className='text-black text-[20px]'/></div>,
            pause: <div className='bg-white rounded-[50%] h-10 w-10 flex justify-center items-center'><TbPlayerPauseFilled className='text-black text-[20px]'/></div>,
            previous: <IoPlayBack className='text-[#ffffff90] text-[22px] hover:text-white' />,
            next: <IoPlayForward className='text-[#ffffff90] text-[22px] hover:text-white' />,
            volume: <div className='bg-[#ffffff20] hover:bg-[#ffffff30] rounded-[50%] h-10 w-10 flex justify-center items-center'><HiSpeakerWave className='text-white text-[18px]' /></div>,
            volumeMute: <div className='bg-[#ffffff20] hover:bg-[#ffffff30] rounded-[50%] h-10 w-10 flex justify-center items-center'><HiSpeakerXMark className='text-white text-[18px]' /></div>,
            loopOff: <div className='bg-[#ffffff20] hover:bg-[#ffffff30] rounded-[50%] h-10 w-10 flex justify-center items-center mt-[-7px]'><FaEllipsisH className='text-white text-[18px]'/></div>,
            loop: <div className='bg-[#ffffff20] hover:bg-[#ffffff30] rounded-[50%] h-10 w-10 flex justify-center items-center mt-[-7px]'><FaEllipsisH className='text-white text-[18px]'/></div>,
          }}
          loop={true}
          autoPlayAfterSrcChange={true}
          autoPlay={true}
          showJumpControls={false}
          showSkipControls={true}
          showDownloadProgress={false}
          showFilledVolume={false}
          onClickPrevious={onClickPrevious}
          onClickNext={onClickNext}
        />
      </div>
    </div>
  )
}