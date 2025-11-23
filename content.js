<<<<<<< HEAD
let lastSelection = "";

document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  if (!selection || selection.toString().trim() === "") return;

  const container = document.createElement("div");
  for (let i = 0; i < selection.rangeCount; i++) {
    container.appendChild(selection.getRangeAt(i).cloneContents());
  }

  const html = container.innerHTML;

  // avoid saving same selection repeatedly
  if (html === lastSelection) return;
  lastSelection = html;

  const snippet = {
    content: html,
    time: new Date().toLocaleString()
  };

  chrome.storage.sync.get({ snippets: [] }, data => {
    const updated = [...data.snippets, snippet];
    chrome.storage.sync.set({ snippets: updated });
  });

  // optional toast message in page itself
  const toast = document.createElement("div");
  toast.textContent = "✅ Snippet Saved!";
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#00f2fe",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "10px",
    fontFamily: "Poppins, sans-serif",
    zIndex: 999999,
    animation: "fadeOut 1.5s forwards"
  });
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
});
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "copyContent") {
    const selection = window.getSelection();
    if (!selection || selection.toString().trim() === "") return sendResponse({ html: null });
    const container = document.createElement("div");
    for (let i = 0; i < selection.rangeCount; i++) {
      container.appendChild(selection.getRangeAt(i).cloneContents());
    }
    sendResponse({ html: container.innerHTML });
  }
});
=======
let lastSelection = "";

document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  if (!selection || selection.toString().trim() === "") return;

  const container = document.createElement("div");
  for (let i = 0; i < selection.rangeCount; i++) {
    container.appendChild(selection.getRangeAt(i).cloneContents());
  }

  const html = container.innerHTML;

  // avoid saving same selection repeatedly
  if (html === lastSelection) return;
  lastSelection = html;

  const snippet = {
    content: html,
    time: new Date().toLocaleString()
  };

  chrome.storage.sync.get({ snippets: [] }, data => {
    const updated = [...data.snippets, snippet];
    chrome.storage.sync.set({ snippets: updated });
  });

  // optional toast message in page itself
  const toast = document.createElement("div");
  toast.textContent = "✅ Snippet Saved!";
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#00f2fe",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "10px",
    fontFamily: "Poppins, sans-serif",
    zIndex: 999999,
    animation: "fadeOut 1.5s forwards"
  });
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
});
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "copyContent") {
    const selection = window.getSelection();
    if (!selection || selection.toString().trim() === "") return sendResponse({ html: null });
    const container = document.createElement("div");
    for (let i = 0; i < selection.rangeCount; i++) {
      container.appendChild(selection.getRangeAt(i).cloneContents());
    }
    sendResponse({ html: container.innerHTML });
  }
});
>>>>>>> d9a9488c191fef0fc5b6fe41cd73ebb63c5af5ff
