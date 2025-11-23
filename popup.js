<<<<<<< HEAD
const copyBtn = document.getElementById('copyBtn');
const snippetsDiv = document.getElementById('snippets');
const themeToggle = document.getElementById('themeToggle');
const exportBtn = document.getElementById('exportBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');

// --- Load theme ---
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// --- Theme Toggle ---
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// --- Toast Notification ---
function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// --- Confetti Celebration ---
function celebrate() {
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.6 }
  });
}

// --- Copy Selected Content from Page ---
copyBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "copyContent" }, response => {
      if (response && response.html) {
        const snippet = {
          content: response.html,
          time: new Date().toLocaleString()
        };
        chrome.storage.sync.get({ snippets: [] }, data => {
          const updated = [...data.snippets, snippet];
          chrome.storage.sync.set({ snippets: updated }, () => {
            renderSnippets(updated);
            showToast("✅ Snippet Saved!");
            celebrate();
          });
        });
      }
    });
  });
});

// --- Export Snippets ---
exportBtn.addEventListener("click", () => {
  chrome.storage.sync.get({ snippets: [] }, data => {
    if (data.snippets.length === 0) {
      showToast("⚠️ No snippets to export");
      return;
    }
    const textContent = data.snippets
  .map(s => {
    const temp = document.createElement("div");
    temp.innerHTML = s.content;
    return temp.textContent.trim();
  })
  .join('\n\n');

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "snippets.txt";
    a.click();
    URL.revokeObjectURL(url);
    showToast("📁 Exported snippets!");
  });
});

// --- Delete All Snippets ---
deleteAllBtn.addEventListener("click", () => {
  if (confirm("⚠️ Delete all saved snippets? This action cannot be undone.")) {
    chrome.storage.sync.set({ snippets: [] }, () => {
      renderSnippets([]);
      showToast("🗑️ All snippets deleted!");
    });
  }
});


// --- Render Stored Snippets ---
function renderSnippets(snippets) {
  snippetsDiv.innerHTML = "";
  snippets.forEach((s, index) => {
    const div = document.createElement("div");
    div.className = "snippet";
    div.innerHTML = `
      <div class="time">${s.time}</div>
      <div class="content">${s.content}</div>
      <button class="deleteBtn" data-index="${index}">🗑 Delete</button>
    `;
    snippetsDiv.appendChild(div);
  });

  // Delete button logic
  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      chrome.storage.sync.get({ snippets: [] }, data => {
        const updated = data.snippets.filter((_, i) => i !== idx);
        chrome.storage.sync.set({ snippets: updated }, () => renderSnippets(updated));
      });
    });
  });
}

// --- Load Snippets on Startup ---
chrome.storage.sync.get({ snippets: [] }, data => renderSnippets(data.snippets));
=======
const copyBtn = document.getElementById('copyBtn');
const snippetsDiv = document.getElementById('snippets');
const themeToggle = document.getElementById('themeToggle');
const exportBtn = document.getElementById('exportBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');

// --- Load theme ---
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// --- Theme Toggle ---
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// --- Toast Notification ---
function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// --- Confetti Celebration ---
function celebrate() {
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.6 }
  });
}

// --- Copy Selected Content from Page ---
copyBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "copyContent" }, response => {
      if (response && response.html) {
        const snippet = {
          content: response.html,
          time: new Date().toLocaleString()
        };
        chrome.storage.sync.get({ snippets: [] }, data => {
          const updated = [...data.snippets, snippet];
          chrome.storage.sync.set({ snippets: updated }, () => {
            renderSnippets(updated);
            showToast("✅ Snippet Saved!");
            celebrate();
          });
        });
      }
    });
  });
});

// --- Export Snippets ---
exportBtn.addEventListener("click", () => {
  chrome.storage.sync.get({ snippets: [] }, data => {
    if (data.snippets.length === 0) {
      showToast("⚠️ No snippets to export");
      return;
    }
    const textContent = data.snippets
  .map(s => {
    const temp = document.createElement("div");
    temp.innerHTML = s.content;
    return temp.textContent.trim();
  })
  .join('\n\n');

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "snippets.txt";
    a.click();
    URL.revokeObjectURL(url);
    showToast("📁 Exported snippets!");
  });
});

// --- Delete All Snippets ---
deleteAllBtn.addEventListener("click", () => {
  if (confirm("⚠️ Delete all saved snippets? This action cannot be undone.")) {
    chrome.storage.sync.set({ snippets: [] }, () => {
      renderSnippets([]);
      showToast("🗑️ All snippets deleted!");
    });
  }
});


// --- Render Stored Snippets ---
function renderSnippets(snippets) {
  snippetsDiv.innerHTML = "";
  snippets.forEach((s, index) => {
    const div = document.createElement("div");
    div.className = "snippet";
    div.innerHTML = `
      <div class="time">${s.time}</div>
      <div class="content">${s.content}</div>
      <button class="deleteBtn" data-index="${index}">🗑 Delete</button>
    `;
    snippetsDiv.appendChild(div);
  });

  // Delete button logic
  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      chrome.storage.sync.get({ snippets: [] }, data => {
        const updated = data.snippets.filter((_, i) => i !== idx);
        chrome.storage.sync.set({ snippets: updated }, () => renderSnippets(updated));
      });
    });
  });
}

// --- Load Snippets on Startup ---
chrome.storage.sync.get({ snippets: [] }, data => renderSnippets(data.snippets));
>>>>>>> d9a9488c191fef0fc5b6fe41cd73ebb63c5af5ff
