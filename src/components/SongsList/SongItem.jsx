export const SongItem = ({ song, onSelectSong, selectedSong }) => {

    const isSelected = selectedSong && selectedSong.id === song.id;

    return (
        <li style={{backgroundColor: isSelected ? '#ffffff20' : 'transparent'}} className='flex justify-between items-center rounded-lg py-4 px-3 w-full cursor-pointer hover:bg-[#ffffff10!important] transition-all duration-300' onClick={() => onSelectSong(song)}>
            <div className='flex items-center'>
                <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} draggable={false} className='w-12 h-12 mr-4 rounded-[50%] select-none' />
                <div>
                    <p className='text-white font-[inter] font-[400] text-[18px] leading-6'>{song.name}</p>
                    <p className='text-[#ffffff60] font-[inter] text-[14px] leading-6'>{song.artist}</p>
                </div>
            </div>
            <span className='text-[#ffffff60] font-[inter] font-[400] text-[18px] leading-6'>3:45</span>
        </li>
    )
}