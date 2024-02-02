const main = () => {
  const textareaList = document.querySelectorAll("textarea");
  for (const textarea of textareaList) {
    textarea.addEventListener("keydown", (e) => {
      const isSelected = textarea.selectionStart !== textarea.selectionEnd; // 選択範囲があるかどうか
      if (!isSelected) {
        if (e.key === "Tab" && e.shiftKey) {
          e.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const text = textarea.value;
          const beforeText = text.substring(0, start);
          const afterText = text.substring(end);
          const lines = beforeText.split("\n");
          const lastLine = lines[lines.length - 1];
          const newLastLine = lastLine.replace(/^ {1,2}/, "");
          textarea.value = beforeText.substring(0, beforeText.length - lastLine.length) + newLastLine + afterText;
          textarea.selectionStart = textarea.selectionEnd = start - (lastLine.length - newLastLine.length);
        } else if (e.key === "Tab") {
          e.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const text = textarea.value;
          const beforeText = text.substring(0, start);
          const afterText = text.substring(end);
          const lines = beforeText.split("\n");
          const lastLine = lines[lines.length - 1];
          const newLastLine = "  " + lastLine;
          textarea.value = beforeText.substring(0, beforeText.length - lastLine.length) + newLastLine + afterText;
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }
      }
    });
  }
};

chrome.storage.sync.get("isEnabled", (data) => {
  main();
});