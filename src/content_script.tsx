const main = (e: KeyboardEvent): void => {
  const activeElement = e.target as HTMLTextAreaElement;
  const isSelected =
    activeElement.selectionStart !== activeElement.selectionEnd; // 選択範囲があるかどうか
  if (!isSelected) {
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      const text = activeElement.value;
      const beforeText = text.substring(0, start);
      const afterText = text.substring(end);
      const lines = beforeText.split("\n");
      const lastLine = lines[lines.length - 1];
      const newLastLine = lastLine.replace(/^ {1,2}/, "");
      activeElement.value =
        beforeText.substring(0, beforeText.length - lastLine.length) +
        newLastLine +
        afterText;
      activeElement.selectionStart = activeElement.selectionEnd =
        start - (lastLine.length - newLastLine.length);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      const text = activeElement.value;
      const beforeText = text.substring(0, start);
      const afterText = text.substring(end);
      const lines = beforeText.split("\n");
      const lastLine = lines[lines.length - 1];
      const newLastLine = `  ${lastLine}`;
      activeElement.value =
        beforeText.substring(0, beforeText.length - lastLine.length) +
        newLastLine +
        afterText;
      activeElement.selectionStart = activeElement.selectionEnd = start + 2;
    }
  }
};

document.addEventListener("focusin", () => {
  const activeElement = document.activeElement;
  if (activeElement instanceof HTMLTextAreaElement) {
    activeElement.removeEventListener("keydown", main, true);
    activeElement.addEventListener("keydown", main, true);
  }
});
