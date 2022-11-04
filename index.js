if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service_worker.js");
}

const viewInnocuous = document.getElementById("view-innocuous");
const viewSecret = document.getElementById("view-secret");

let activeView = viewInnocuous;
const changeView = (target) => {
  activeView.style.display = "none";
  target.style.display = "block";
  activeView = target;
};

const correctSteps = Object.freeze(["left", "right", "right", "left", "right"]);
const lastSteps = [];

const secretAudio = new Audio("./never.flac");
const secretProgress = document.getElementById("secret-progress");

let progressIsBeingUpdated = false;
const updateProgress = () => {
  secretProgress.value = secretAudio.currentTime / secretAudio.duration;
  if (progressIsBeingUpdated) requestAnimationFrame(updateProgress);
};

document.addEventListener("pointerdown", (event) => {
  if (activeView !== viewInnocuous) return;

  if (event.clientX < window.innerWidth / 2) lastSteps.push("left");
  if (event.clientX > window.innerWidth / 2) lastSteps.push("right");
  if (lastSteps.length > correctSteps.length) lastSteps.shift();

  for (let i = 0; i < correctSteps.length; i++) {
    if (lastSteps[i] !== correctSteps[i]) {
      return;
    }
  }

  changeView(viewSecret);
  secretAudio.addEventListener(
    "ended",
    () => {
      progressIsBeingUpdated = false;
      changeView(viewInnocuous);
    },
    { once: true }
  );
  secretAudio.play();
  progressIsBeingUpdated = true;
  updateProgress();
});
