const doc = document,
      song = doc.querySelector(".song"),
      play = doc.querySelector(".play"),
      replay = doc.querySelector(".replay"),
      outline = doc.querySelector(".moving-outline circle"),
      video = doc.querySelector(".vid-container video"),
//Sounds
      sounds = doc.querySelectorAll(".sound-picker button"),
//Time Display
      timeDisplay = doc.querySelector(".time-display"),
      outlineLength = outline.getTotalLength(),
//Duration
      timeSelect = doc.querySelectorAll(".time-select button");
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${addZero(Math.floor(fakeDuration % 60))}`;

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
};

sounds.forEach(sound => {
  sound.addEventListener("click", function() {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
});

play.addEventListener("click", function() {
  checkPlaying(song);
});

replay.addEventListener("click", function() {
    restartSong(song);
  });

const restartSong = song =>{
    let currentTime = song.currentTime;
    song.currentTime = 0;
}

timeSelect.forEach(option => {
  option.addEventListener("click", function() {
    fakeDuration = this.getAttribute("data-time");
    timeDisplay.textContent = `${addZero(Math.floor(fakeDuration / 60))}:${addZero(Math.floor(
      fakeDuration % 60
    ))}`;
  });
});

const checkPlaying = song => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = "./svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "./svg/play.svg";
  }
};

song.ontimeupdate = function() {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  timeDisplay.textContent = `${addZero(minutes)}:${addZero(seconds)}`;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
};
