if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service_worker.js");
}

const viewInnocuous = document.getElementById("view-innocuous");
const viewSecret = document.getElementById("view-secret");
const viewCashewkern1 = document.getElementById("view-cashewkern-1");
const viewCashewkern2 = document.getElementById("view-cashewkern-2");
const viewVertretungsplan = document.getElementById("view-vertretungsplan");
const viewSpeiseplan = document.getElementById("view-speiseplan");

let activeView = viewInnocuous;
const changeView = (target) => {
  activeView.style.display = "none";
  if (target !== viewCashewkern2) {
    target.style.display = "block";
    document.documentElement.style.backgroundImage = "";
    document.documentElement.style.backgroundSize = "";
  } else {
    target.style.display = "flex";
    document.documentElement.style.backgroundImage =
      'url("./assets/cashewkerne.jpg")';
    document.documentElement.style.backgroundSize = "cover";
  }
  activeView = target;
};

const correctSteps = Object.freeze(["left", "right", "right", "left", "right"]);
const lastSteps = [];

const secretAudio = new Audio("./assets/never.flac");
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

  secretAudio.addEventListener(
    "ended",
    () => {
      if (activeView !== viewSecret) return;
      progressIsBeingUpdated = false;
      changeView(viewInnocuous);
    },
    { once: true }
  );
  secretAudio.play();
  progressIsBeingUpdated = true;
  updateProgress();
  changeView(viewSecret);
});

const cashewkernTrigger = document.getElementById("cashewkern-trigger");
const cashewkernYes = document.getElementById("cashewkern-yes");
const cashewkernNo = document.getElementById("cashewkern-no");

const cashewkernIntroAudio = new Audio("./assets/cashewkern_intro.wav");
const cashewkernYesAudio = new Audio("./assets/cashewkern_yes.wav");
const cashewkernNoAudio = new Audio("./assets/cashewkern_no.wav");

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

const registerExternalSite = (config) => {
  config.trigger.addEventListener("click", () => {
    if (activeView !== viewInnocuous) return;
    changeView(config.view);
    config.iframe.src = config.url();
    if (config.onOpen) config.onOpen();
  });

  config.back.addEventListener("click", () => {
    if (activeView !== config.view) return;
    changeView(viewInnocuous);
    config.iframe.src = "";
    if (config.onClose) config.onClose();
  });
};

const vertretungsplanTrigger = document.getElementById(
  "vertretungsplan-trigger"
);
const vertretungsplanIframe = document.getElementById("vertretungsplan-iframe");
const vertretungsplanBack = document.getElementById("vertretungsplan-back");
const vertretungsplanURL =
  "https://kephiso.webuntis.com/WebUntis/monitor?school=reformschule-kassel&monitorType=subst&format=Vertretung";

let timeoutID;
let initialCallOvercome;

const observer = new ResizeObserver(() => {
  if (!initialCallOvercome) {
    initialCallOvercome = true;
    return;
  }

  clearTimeout(timeoutID);
  timeoutID = setTimeout(() => {
    vertretungsplanIframe.src = vertretungsplanURL;
  }, 250);
});

registerExternalSite({
  trigger: vertretungsplanTrigger,
  view: viewVertretungsplan,
  iframe: vertretungsplanIframe,
  back: vertretungsplanBack,
  url: () => vertretungsplanURL,
  onOpen: () => {
    initialCallOvercome = false;
    observer.observe(vertretungsplanIframe);
  },
  onClose: () => {
    observer.disconnect();
    clearTimeout(timeoutID);
  },
});

const speiseplanTrigger = document.getElementById("speiseplan-trigger");
const speiseplanIframe = document.getElementById("speiseplan-iframe");
const speiseplanBack = document.getElementById("speiseplan-back");

// https://stackoverflow.com/a/6117889
const isoWeekOfYear = (date) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

registerExternalSite({
  trigger: speiseplanTrigger,
  view: viewSpeiseplan,
  iframe: speiseplanIframe,
  back: speiseplanBack,
  url: () =>
    `https://www.biond.de/sp/reformschule/Reformschule,%20${isoWeekOfYear(
      new Date()
    )}.%20KW.pdf`,
});
