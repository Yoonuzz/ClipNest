<<<<<<< HEAD
chrome.runtime.onInstalled.addListener(() => {
  console.log("Web Snippet Saver Installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "copyContent") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: () => {
        const selection = window.getSelection();
        if (!selection) return null;
        const container = document.createElement("div");
        for (let i = 0; i < selection.rangeCount; i++) {
          container.appendChild(selection.getRangeAt(i).cloneContents());
        }
        return container.innerHTML;
      },
    }, (results) => sendResponse({ html: results?.[0]?.result || "" }));
    return true;
  }
});
=======
chrome.runtime.onInstalled.addListener(() => {
  console.log("Web Snippet Saver Installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "copyContent") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: () => {
        const selection = window.getSelection();
        if (!selection) return null;
        const container = document.createElement("div");
        for (let i = 0; i < selection.rangeCount; i++) {
          container.appendChild(selection.getRangeAt(i).cloneContents());
        }
        return container.innerHTML;
      },
    }, (results) => sendResponse({ html: results?.[0]?.result || "" }));
    return true;
  }
});
>>>>>>> d9a9488c191fef0fc5b6fe41cd73ebb63c5af5ff
