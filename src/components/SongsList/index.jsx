import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { SongItem } from "./SongItem";
import { Audio } from "react-loader-spinner";

const apiStatusConstants = {
    initial: 'INITIAL',
    inProgess: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE'
}

export const SongsList = ({onSelectSong, selectedSong}) => {

    const [searchInput, setSearchInput] = useState('');
    const [songsList, setSongsList] = useState([]);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

    const onSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    }

    useEffect(() => {
        setApiStatus(apiStatusConstants.inProgess);
        const delayDebounceFn = setTimeout(() => {
            fetchSongs();
        }, 2000);

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

    const renderSongsList = () => (
        songsList.map(song => <SongItem key={song.id} song={song} onSelectSong={onSelectSong} selectedSong={selectedSong} />)
    )

    const renderNoSongsFound = () => (
        <div className='w-full h-full flex justify-center items-center'>
            <p className='text-[#ffffff90] text-lg'>No songs found</p>
        </div>
    )

    const renderLoader = () => (
        <div className='w-full h-full flex justify-center items-center'>
            <Audio
            height="25"
            width="25"
            color="#f1f1f1"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
            />
        </div>
    )

    const renderFailure = () => (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <p className='text-[#ffffff90] text-lg'>Oops! Something went wrong</p>
            <button className='text-white text-base mt-5 font-bold font-[inter] border-none bg-[#ffffff30] py-2 px-4 rounded-md' onClick={fetchSongs}>Retry</button>
        </div>
    )

    const renderSwitch = () => {
        switch (apiStatus) {
            case apiStatusConstants.inProgess:
                return renderLoader();
            case apiStatusConstants.success:
                return songsList.length > 0 ? renderSongsList() : renderNoSongsFound();
            case apiStatusConstants.failure:
                return renderFailure();
            default:
                return null;
        }
    }

    return (
        <div className='w-full h-[100vh] md:w-1/2 flex justify-between items-start p-6'>
            <div className='min-h-[calc(100vh-48px)] flex flex-col justify-between items-start w-[20%] max-w-[200px]' >
                <img src='/Logo.svg' alt='song' className='w-[125px] select-none' draggable={false} />
                <div className='flex justify-between items-start bg-black w-12 h-12 rounded-[50%]'>
                    <img src='/Profile.png' alt='song' className='w-12 h-8 select-none' draggable={false} />
                </div>
            </div>
            <div className='min-h-[calc(100vh-48px)] flex flex-col items-start max-w-80% w-[400px]'>
                <div className='flex items-center mt-1'>
                    <button className='text-white text-2xl mr-10 font-bold font-[inter] border-none bg-transparent p-0'>For You</button>
                    <button className='text-white text-2xl font-bold font-[inter] border-none bg-transparent p-0'>Top Tracks</button>
                </div>
                <div className='flex justify-between items-center bg-[#ffffff15] rounded-lg py-[8px] px-[16px] mt-6 w-full'>
                    <input 
                        type='search' 
                        placeholder='Search Song, Artist' 
                        className='w-full bg-transparent border-none outline-none font-[inter] text-white text-[16px]' 
                        value={searchInput} 
                        onChange={onSearchInputChange} 
                    />
                    <FiSearch className='text-[#ffffff60] text-xl' />
                </div>
                <ul className='w-full mt-5 flex flex-col justify-start items-start h-[77vh] overflow-auto'>
                    {renderSwitch()}
                </ul>
            </div>
        </div>
    )
}