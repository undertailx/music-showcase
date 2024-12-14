const songs = [
  {
    title: "blue",
    artist: "yung kai",
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b273618147d1733c84ae7edfbf6b",
    audioUrl: "sounds/blue.mp3",
  },
  {
    title: "wildflower",
    artist: "yung kai",
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b273e5544b618b0fd10d43d68652",
    audioUrl: "sounds/wildflower.mp3",
  },
  {
    title: "light",
    artist: "wave to earth",
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b273666efc476444cf734af19ced",
    audioUrl: "sounds/light.mp3",
  },
  {
    title: "Die For You",
    artist: "Joji",
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b273eaac2a7955f5b8967991cacb",
    audioUrl: "sounds/Die-For-You.mp3",
  },
];

let currentlyPlaying = null;
let currentlyPlayingButton = null;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function createSongCard(song) {
  const card = document.createElement("div");
  card.className = "song-card";

  const cover = document.createElement("img");
  cover.src = song.coverUrl;
  cover.alt = song.title;
  cover.className = "song-cover";

  const title = document.createElement("div");
  title.textContent = song.title;
  title.className = "song-title";

  const artist = document.createElement("div");
  artist.textContent = song.artist;
  artist.className = "song-artist";

  const audio = document.createElement("audio");
  audio.src = song.audioUrl;

  const customAudioPlayer = document.createElement("div");
  customAudioPlayer.className = "custom-audio-player";

  const playBtn = document.createElement("button");
  playBtn.className = "play-btn";
  playBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
    `;

  const timeDisplay = document.createElement("div");
  timeDisplay.className = "time-display";
  timeDisplay.textContent = "0:00 / 0:00";

  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  const progress = document.createElement("div");
  progress.className = "progress";
  progressBar.appendChild(progress);

  playBtn.onclick = () => {
    if (audio.paused) {
      if (currentlyPlaying && currentlyPlaying !== audio) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;
        currentlyPlayingButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        `;
      }

      audio.play();
      currentlyPlaying = audio;
      currentlyPlayingButton = playBtn;
      playBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        `;
    } else {
      audio.pause();
      currentlyPlaying = null;
      currentlyPlayingButton = null;
      playBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        `;
    }
  };

  audio.addEventListener("loadedmetadata", () => {
    timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
  });

  audio.addEventListener("timeupdate", () => {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percentage}%`;
    timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(
      audio.duration
    )}`;
  });

  audio.addEventListener("ended", () => {
    playBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
      `;
  });

  progressBar.addEventListener("click", (e) => {
    const percent = e.offsetX / progressBar.offsetWidth;
    audio.currentTime = percent * audio.duration;
  });

  customAudioPlayer.appendChild(playBtn);
  customAudioPlayer.appendChild(timeDisplay);
  customAudioPlayer.appendChild(progressBar);

  card.appendChild(cover);
  card.appendChild(title);
  card.appendChild(artist);
  card.appendChild(customAudioPlayer);
  card.appendChild(audio);

  return card;
}

const playlistContainer = document.getElementById("playlist");
songs.forEach((song) => {
  const songCard = createSongCard(song);
  playlistContainer.appendChild(songCard);
});
