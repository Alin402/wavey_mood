import React, { useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
import { songs } from "../../data/songs";
import 'react-h5-audio-player/lib/styles.css';
import { BsFillPlayBtnFill } from "react-icons/bs";
import { BsPauseBtnFill } from "react-icons/bs";
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";
import { BsFillVolumeDownFill } from "react-icons/bs";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import "./Player.css";

const PlayIcon = () => 
    <BsFillPlayBtnFill 
        color="#F2EADE"
    />

const PauseIcon = () => 
    <BsPauseBtnFill 
        color="#F2EADE"
    />

const NextIcon = () => 
    <GiNextButton 
        color="#F2EADE"
    />

const PreviousIcon = () => 
    <GiPreviousButton 
        color="#F2EADE"
    />

const VolumeIcon = () => 
    <BsFillVolumeDownFill 
        color="#F2EADE"
    />

const VolumeMuteIcon = () => 
    <BsFillVolumeMuteFill 
        color="#F2EADE"
    />

const Player = ({ pause, play }) => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const playNextSong = () => {
        if (currentSongIndex === songs.length - 1) {
            setCurrentSongIndex(0);
        } else {
            setCurrentSongIndex(currentSongIndex + 1);
        }
    }

    const playPreviousSong = () => {
        if (currentSongIndex === 0) {
            setCurrentSongIndex(songs.length - 1);
        } else {
            setCurrentSongIndex(currentSongIndex - 1);
        }
    }

    return (
        <div className="player">
            <div className="song-info">
                <div className="info-container">
                    <p className="song-title">
                        {songs[currentSongIndex].title}
                    </p>
                </div>
                <div className="info-container">
                    <p className="song-artist">
                        {songs[currentSongIndex].artist}
                    </p>
                </div>
            </div>
            <div className="audio">
                <AudioPlayer
                    showSkipControls
                    src={songs[currentSongIndex].audio}
                    showFilledProgress
                    style={{ 
                        backgroundColor: "#1E1D1B",
                        color: "#F2EADE"
                    }}
                    customIcons={{
                        play: <PlayIcon />,
                        pause: <PauseIcon />,
                        forward: <NextIcon />,
                        rewind: <PreviousIcon />,
                        volume: <VolumeIcon />,
                        volumeMute: <VolumeMuteIcon />
                    }}
                    listenInterval={0}
                    onPlay={play}
                    onPause={pause}
                    onClickNext={playNextSong}
                    onClickPrevious={playPreviousSong}
                />
            </div>
            <div className="action">

            </div>
        </div>
    );
}

export default Player;