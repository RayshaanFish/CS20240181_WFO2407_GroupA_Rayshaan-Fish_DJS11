import React, { useState, useRef } from "react";
import "./AudioPlayer.css";

function AudioPlayer({ audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="audio-player">
      {audioSrc ? (
        <>
          <audio ref={audioRef} src={audioSrc} />
          <button onClick={togglePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </>
      ) : (
        <p>Select an episode to play</p>
      )}
    </div>
  );
}

export default AudioPlayer;
