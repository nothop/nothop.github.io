if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service_worker.js");
}

const audio = new Audio("./hash.wav");

let secretStep = 0;

const rightStepTaken = (event) => {
  if (
    (secretStep === 0 || secretStep === 3) &&
    event.clientX < window.innerWidth / 2
  )
    return true;
  if (
    (secretStep === 1 || secretStep === 2 || secretStep === 4) &&
    event.clientX > window.innerWidth / 2
  )
    return true;

  return false;
};

document.addEventListener("pointerdown", (event) => {
  if (rightStepTaken(event)) {
    secretStep++;
  } else {
    secretStep = 0;
  }

  if (secretStep === 5) {
    // prettier-ignore
    audio.addEventListener(
      "ended",
      () => window.location.href = "https://www.facebook.com/Reformschule.Kassel",
      { once: true }
    );
    audio.play();

    secretStep = 0;
  }
});
