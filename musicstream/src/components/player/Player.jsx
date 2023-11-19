import React, { useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { BsFillPlayBtnFill } from "react-icons/bs";
import { BsPauseBtnFill } from "react-icons/bs";
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";
import { BsFillVolumeDownFill } from "react-icons/bs";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
    setCurrentSong
} from "../../actions/songQueue";
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
    const dispatch = useDispatch();
    const currentSong = useSelector((state) => state.songQueue.currentSong);
    const songs = useSelector((state) => state.songQueue.songs)

    const playNextSong = () => {
        if (songs.length && currentSong) {
            let currentIndex = songs.indexOf(currentSong);
            if (currentIndex === songs.length - 1) {
                dispatch(setCurrentSong(songs[0]))
                return;
            }
            dispatch(setCurrentSong(songs[currentIndex + 1]))
        }
    }

    const playPreviousSong = () => {
        if (songs.length && currentSong) {
            let currentIndex = songs.indexOf(currentSong);
            if (currentIndex === 0) {
                dispatch(setCurrentSong(songs[songs.length - 1]))
                return;
            }
            dispatch(setCurrentSong(songs[currentIndex - 1]))
        }
    }

    return (
        <div className="player">
            <div className="song-info">
                <div className="info-container">
                    <p className="song-title" style={{ fontSize: "2.5em" }}>
                        {currentSong?.name}
                    </p>
                </div>
                <div className="info-container">
                    <p className="song-artist">
                        {currentSong?.artistName}
                    </p>
                </div>
            </div>
            <div className="audio">
                <AudioPlayer
                    autoPlayAfterSrcChange={true}
                    showSkipControls
                    src={`http://localhost:5000/songs/${currentSong.fileUrl}`}
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
                    onEnded={playNextSong}
                />
            </div>
            <div className="action">

            </div>
        </div>
    );
}

export default Player;