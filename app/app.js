const STORAGE_KEY = "focusboard.tasks";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const clearDoneBtn = document.querySelector("#clear-done");
const tipText = document.querySelector("#tip-text");
const reloadTipBtn = document.querySelector("#reload-tip");
const networkStatus = document.querySelector("#network-status");
const mirrorVideo = document.querySelector("#mirror-video");
const mirrorPlaceholder = document.querySelector("#mirror-placeholder");
const mirrorStatus = document.querySelector("#mirror-status");
const cameraPermissionLabel = document.querySelector("#camera-permission-label");
const startCameraBtn = document.querySelector("#start-camera");
const stopCameraBtn = document.querySelector("#stop-camera");

/** @type {MediaStream | null} */
let cameraStream = null;

/** @typedef {{ id: string, title: string, done: boolean }} Task */

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** @param {Task[]} tasks */
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function updateNetworkStatus() {
  const online = navigator.onLine;
  networkStatus.classList.toggle("is-offline", !online);
  networkStatus.querySelector(".status__label").textContent = online
    ? "Online"
    : "Offline";
}

/** @param {Task[]} tasks */
function renderTasks(tasks) {
  list.innerHTML = "";
  emptyState.classList.toggle("is-visible", tasks.length === 0);

  for (const task of tasks) {
    const li = document.createElement("li");
    li.className = `task${task.done ? " is-done" : ""}`;
    li.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", `Erledigt: ${task.title}`);

    const title = document.createElement("p");
    title.className = "task__title";
    title.textContent = task.title;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "task__delete";
    remove.setAttribute("aria-label", `Löschen: ${task.title}`);
    remove.textContent = "Entfernen";

    li.append(checkbox, title, remove);
    list.append(li);
  }
}

async function loadTip() {
  tipText.textContent = "Tipp wird geladen…";
  try {
    const response = await fetch("./data/tips.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const tips = await response.json();
    const tip = tips[Math.floor(Math.random() * tips.length)];
    tipText.textContent = tip;
  } catch {
    tipText.textContent =
      "Tipp konnte nicht geladen werden. Bist du offline – oder fehlt ein Cache?";
  }
}

/** @type {Task[]} */
let tasks = loadTasks();
renderTasks(tasks);
updateNetworkStatus();
loadTip();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  tasks = [{ id: createId(), title, done: false }, ...tasks];
  saveTasks(tasks);
  renderTasks(tasks);
  form.reset();
  input.focus();
});

list.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") return;
  const item = target.closest(".task");
  if (!item) return;

  tasks = tasks.map((task) =>
    task.id === item.dataset.id ? { ...task, done: target.checked } : task
  );
  saveTasks(tasks);
  renderTasks(tasks);
});

list.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.classList.contains("task__delete")) {
    return;
  }
  const item = target.closest(".task");
  if (!item) return;
  tasks = tasks.filter((task) => task.id !== item.dataset.id);
  saveTasks(tasks);
  renderTasks(tasks);
});

clearDoneBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.done);
  saveTasks(tasks);
  renderTasks(tasks);
});

reloadTipBtn.addEventListener("click", () => {
  loadTip();
});

function setMirrorStatus(message) {
  mirrorStatus.textContent = message;
}

function setCameraButtons(active) {
  startCameraBtn.disabled = active;
  stopCameraBtn.disabled = !active;
}

async function refreshCameraPermission() {
  if (!navigator.permissions?.query) {
    cameraPermissionLabel.textContent = "Permissions API nicht verfügbar";
    return;
  }
  try {
    const result = await navigator.permissions.query({ name: /** @type {PermissionName} */ ("camera") });
    cameraPermissionLabel.textContent = result.state;
    result.onchange = () => {
      cameraPermissionLabel.textContent = result.state;
    };
  } catch {
    cameraPermissionLabel.textContent = "nicht abfragbar (Browser-abhängig)";
  }
}

function stopCamera() {
  if (cameraStream) {
    for (const track of cameraStream.getTracks()) {
      track.stop();
    }
    cameraStream = null;
  }
  mirrorVideo.srcObject = null;
  mirrorVideo.classList.remove("is-active");
  mirrorPlaceholder.classList.remove("is-hidden");
  setCameraButtons(false);
  setMirrorStatus("Kamera gestoppt. Tracks freigegeben.");
  refreshCameraPermission();
}

async function startCamera() {
  if (!window.isSecureContext) {
    setMirrorStatus("Kamera braucht einen Secure Context (HTTPS oder localhost).");
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    setMirrorStatus("getUserMedia wird von diesem Browser nicht unterstützt.");
    return;
  }

  setMirrorStatus("Browser fragt nach Kamera-Berechtigung…");
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false,
    });
    mirrorVideo.srcObject = cameraStream;
    await mirrorVideo.play();
    mirrorVideo.classList.add("is-active");
    mirrorPlaceholder.classList.add("is-hidden");
    setCameraButtons(true);
    setMirrorStatus("Live-Spiegel aktiv (gespiegelt via CSS scaleX(-1)).");
  } catch (error) {
    const name = error instanceof DOMException ? error.name : "Error";
    if (name === "NotAllowedError" || name === "PermissionDeniedError") {
      setMirrorStatus("Berechtigung verweigert. In den Browser-Einstellungen freigeben und erneut versuchen.");
    } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
      setMirrorStatus("Keine Kamera gefunden.");
    } else {
      setMirrorStatus(`Kamera konnte nicht gestartet werden (${name}).`);
    }
    setCameraButtons(false);
  }
  refreshCameraPermission();
}

startCameraBtn.addEventListener("click", () => {
  startCamera();
});

stopCameraBtn.addEventListener("click", () => {
  stopCamera();
});

window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);
window.addEventListener("pagehide", stopCamera);

refreshCameraPermission();
