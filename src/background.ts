chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.action.disable(tabId);
  const url = tab.url;
  console.log(url);
  if (url === undefined) return;
  if (url.startsWith("https://www.github.com/")) {
    chrome.action.enable(tabId);
  }
});
