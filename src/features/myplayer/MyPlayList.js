import React, { useState, useEffect, useRef, useContext } from "react";
import { PlayerContext } from "./MyPlayer";
import Header from "./Header";

const MyPlayList = () => {
  const { songs, currentMp3Index, setCurrentMp3Index, nextMp3Index } =
    useContext(PlayerContext);
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(0);
  const [currentSong, setCurrentSong] = useState([]);

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  });

  const onEndedHandler = () => {
    nextSong();
  };

  const nextSong = () => {
    if (currentMp3Index === songs.length - 1) {
      setCurrentMp3Index(0);
    } else {
      setCurrentMp3Index(nextMp3Index);
    }
  };

  const onPlayingHandler = () => {
    const duration = audioRef.current.duration;
    const c_time = audioRef.current.currentTime;

    setCurrentSong({
      ...songs,
      progress: (c_time / duration) * 100,
      duration: duration,
    });
  };

  const convertSecToMin = (n) => {
    let min = ~~(n / 60);
    let sec = ~~(n % 60);
    return min + ":" + sec;
  };

  return (
    <>
      <Header
        mp3Title={songs[currentMp3Index].title}
        duration={convertSecToMin(currentSong.duration)}
      />
      <div className="seek-wrap">
        <div
          className="seek-bar"
          style={{ width: `${currentSong.progress + "%"}` }}
        ></div>
      </div>
      <div className="playlist">
        <audio
          ref={audioRef}
          src={songs[currentMp3Index].src}
          onEnded={onEndedHandler}
          onTimeUpdate={onPlayingHandler}
        />
        <ul>
          {songs.map((mp3, idx) => (
            <li
              className={
                "mp3-container " + (currentMp3Index === idx ? "selected" : "")
              }
              key={idx}
              onClick={() => {
                setCurrentMp3Index(idx);
                setIsPlaying(!isPlaying);
              }}
            >
              <div className="mp3meta-playlist">
                <span className="mp3-title">{mp3.title}</span>
                <span className="mp3-artist">{mp3.artist}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MyPlayList;
