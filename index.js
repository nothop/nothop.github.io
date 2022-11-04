if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service_worker.js");
}

const viewInnocuous = document.getElementById("view-innocuous");
const viewSecret = document.getElementById("view-secret");
const viewCashewkern1 = document.getElementById("view-cashewkern-1");
const viewCashewkern2 = document.getElementById("view-cashewkern-2");

let activeView = viewInnocuous;
const changeView = (target) => {
  activeView.style.display = "none";
  if (target !== viewCashewkern2) {
    target.style.display = "block";
    document.documentElement.style.backgroundImage = "";
    document.documentElement.style.backgroundSize = "";
  } else {
    target.style.display = "flex";
    document.documentElement.style.backgroundImage = 'url("./cashewkerne.jpg")';
    document.documentElement.style.backgroundSize = "cover";
  }
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

const cashewkernTrigger = document.getElementById("cashewkern-trigger");
const cashewkernYes = document.getElementById("cashewkern-yes");
const cashewkernNo = document.getElementById("cashewkern-no");

const cashewkernIntroAudio = new Audio("./cashewkern_intro.wav");
const cashewkernYesAudio = new Audio("./cashewkern_yes.wav");
const cashewkernNoAudio = new Audio("./cashewkern_no.wav");

cashewkernTrigger.addEventListener("click", () => {
  if (activeView !== viewInnocuous) return;
  changeView(viewCashewkern1);

  cashewkernIntroAudio.addEventListener(
    "ended",
    () => {
      if (activeView !== viewCashewkern1) return;
      changeView(viewCashewkern2);
    },
    { once: true }
  );
  cashewkernIntroAudio.play();
});

cashewkernYes.addEventListener("click", () => {
  if (activeView !== viewCashewkern2) return;
  changeView(viewCashewkern1);

  cashewkernYesAudio.addEventListener(
    "ended",
    () => {
      if (activeView !== viewCashewkern1) return;
      changeView(viewInnocuous);
    },
    { once: true }
  );
  cashewkernYesAudio.play();
});

cashewkernNo.addEventListener("click", () => {
  if (activeView !== viewCashewkern2) return;
  changeView(viewCashewkern1);

  cashewkernNoAudio.addEventListener(
    "ended",
    () => {
      if (activeView !== viewCashewkern1) return;
      changeView(viewCashewkern2);
    },
    { once: true }
  );
  cashewkernNoAudio.play();
});
