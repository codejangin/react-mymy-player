import React, { useState, useEffect, createContext } from "react";
import MyPlayList from "./MyPlayList";

const playList = [
  {
    title: "Castle - The Maze of Galious",
    artist: "Konami",
    img_src: "./music/_ost.jpg",
    src: "./music/castle.mp3",
  },
  {
    title: "Story - The Maze of Galious",
    artist: "Konami",
    img_src: "./music/_ost.jpg",
    src: "./music/story.mp3",
  },
  {
    title: "World - The Maze of Galious",
    artist: "Konami",
    img_src: "./music/_ost.jpg",
    src: "./music/world.mp3",
  },
];

export const PlayerContext = createContext();

const MyPlayer = () => {
  const [songs] = useState(playList);
  const [currentMp3Index, setCurrentMp3Index] = useState(0);
  const [nextMp3Index, setNextMp3Index] = useState(0);

  useEffect(() => {
    setNextMp3Index(() => {
      if (currentMp3Index + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentMp3Index + 1;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMp3Index]);

  return (
    <PlayerContext.Provider
      value={{ songs, currentMp3Index, setCurrentMp3Index, nextMp3Index }}
    >
      <div className="main">
        <div className="top">
          <MyPlayList />
        </div>
      </div>
    </PlayerContext.Provider>
  );
};

export default MyPlayer;
