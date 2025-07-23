// src/App.js
import React, { useState } from "react";

export default function App() {
  const [songs, setSongs] = useState(["Song A", "Song B", "Song C", "Song D"]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Next song
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  // Previous song
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  };

  // Jump to song
  const handleJumpTo = (index) => {
    setCurrentIndex(index);
  };

  // Delete song
  const handleDelete = (index) => {
    const updatedSongs = songs.filter((_, i) => i !== index);
    setSongs(updatedSongs);

    // Adjust index if needed
    if (index === currentIndex) {
      setCurrentIndex(0);
    } else if (index < currentIndex) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">🎶 Now Playing</h1>

      <div className="text-xl mb-6 text-blue-700 font-semibold">
        {songs.length > 0 ? songs[currentIndex] : "No Songs in Playlist"}
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={songs.length === 0}
        >
          ⏮ Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={songs.length === 0}
        >
          ⏭ Next
        </button>
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">📃 Playlist</h2>
        <ul className="bg-white rounded shadow divide-y">
          {songs.map((song, index) => (
            <li
              key={index}
              className={`flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                index === currentIndex ? "bg-blue-100 font-bold" : ""
              }`}
            >
              <span onClick={() => handleJumpTo(index)}>{song}</span>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
