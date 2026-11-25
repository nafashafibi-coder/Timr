
// DATA TUGAS DAN JADWAL
let tasks = JSON.parse(localStorage.getItem("timeoraTasks")) || [];
let schedules = JSON.parse(localStorage.getItem("timeoraSchedules")) || [];

// TANGGAL HARI INI
document.getElementById("today").textContent =
  new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

// SIMPAN DATA
function saveData() {
  localStorage.setItem("timeoraTasks", JSON.stringify(tasks));
  localStorage.setItem("timeoraSchedules", JSON.stringify(schedules));
}

// TAMBAHKAN TUGAS
document.getElementById("taskForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("taskTitle").value.trim();
  const date = document.getElementById("taskDate").value;

  if (!title) return;

  tasks.push({
    id: Date.now(),
    title: title,
    date: date,
    completed: false
  });

  saveData();
  this.reset();
  renderAll();
});

// TAMPILKAN TUGAS
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = '<p class="empty">Belum ada tugas. Yuk, tambahkan tugas pertamamu!</p>';
  }

  tasks.forEach(task => {
    const item = document.createElement("div");
    item.className = "item";

    const info = document.createElement("div");
    info.className = "item-info";

    const title = document.createElement("strong");
    title.textContent = task.title;

    if (task.completed) title.classList.add("done");

    const date = document.createElement("small");
    date.textContent = task.date ? "Deadline: " + task.date : "Tanpa deadline";

    info.append(title, date);

    const actions = document.createElement("div");
    actions.className = "item-actions";

    const doneButton = document.createElement("button");
    doneButton.textContent = task.completed ? "Batalkan" : "Selesai";
    doneButton.onclick = () => {
      task.completed = !task.completed;
      saveData();
      renderAll();
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.className = "delete";
    deleteButton.onclick = () => {
      if (confirm("Hapus tugas ini?")) {
        tasks = tasks.filter(t => t.id !== task.id);
        saveData();
        renderAll();
      }
    };

    actions.append(doneButton, deleteButton);
    item.append(info, actions);
    list.appendChild(item);
  });
}

// TAMBAHKAN JADWAL
document.getElementById("scheduleForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("scheduleTitle").value.trim();
  const date = document.getElementById("scheduleDate").value;

  if (!title || !date) return;

  schedules.push({
    id: Date.now(),
    title: title,
    date: date
  });

  saveData();
  this.reset();
  renderAll();
});

// TAMPILKAN JADWAL
function renderSchedules() {
  const list = document.getElementById("scheduleList");
  list.innerHTML = "";

  if (schedules.length === 0) {
    list.innerHTML = '<p class="empty">Belum ada jadwal kegiatan.</p>';
  }

  schedules.sort((a, b) => a.date.localeCompare(b.date));

  schedules.forEach(schedule => {
    const item = document.createElement("div");
    item.className = "item";

    const info = document.createElement("div");
    info.className = "item-info";

    const title = document.createElement("strong");
    title.textContent = schedule.title;

    const date = document.createElement("small");
    date.textContent = new Date(schedule.date).toLocaleString("id-ID");

    info.append(title, date);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.className = "delete";

    deleteButton.onclick = () => {
      if (confirm("Hapus jadwal ini?")) {
        schedules = schedules.filter(s => s.id !== schedule.id);
        saveData();
        renderAll();
      }
    };

    const actions = document.createElement("div");
    actions.className = "item-actions";
    actions.appendChild(deleteButton);

    item.append(info, actions);
    list.appendChild(item);
  });
}

// HITUNG RINGKASAN
function updateStats() {
  const completed = tasks.filter(t => t.completed).length;

  document.getElementById("totalTasks").textContent = tasks.length;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("pendingTasks").textContent =
    tasks.length - completed;
}

// PERBARUI SELURUH TAMPILAN
function renderAll() {
  renderTasks();
  renderSchedules();
  updateStats();
}

// TAMPILKAN DATA SAAT WEBSITE DIBUKA
renderAll();
