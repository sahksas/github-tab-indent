chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	const url = tab.url;
	if (url === undefined) return;
	if (url.startsWith("https://www.github.com/")) {
		chrome.action.enable(tabId);
	}
});
