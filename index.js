if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service_worker.js");
}

const audio = new Audio("./message.wav");

const correctSteps = Object.freeze(["left", "right", "right", "left", "right"]);
const lastSteps = [];

document.addEventListener("pointerdown", (event) => {
  if (event.clientX < window.innerWidth / 2) lastSteps.push("left");
  if (event.clientX > window.innerWidth / 2) lastSteps.push("right");
  if (lastSteps.length > correctSteps.length) lastSteps.shift();

  for (let i = 0; i < correctSteps.length; i++) {
    if (lastSteps[i] !== correctSteps[i]) {
      return;
    }
  }

  audio.addEventListener(
    "ended",
    () => (window.location.href = "https://youtu.be/1grLXRfy2j8"),
    { once: true }
  );
  audio.play();
});
