import "./styles/style.css";

const main = (e: KeyboardEvent): void => {
  const activeElement = e.target as HTMLTextAreaElement;
  const isSelected =
    activeElement.selectionStart !== activeElement.selectionEnd; // check if text is selected
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

    if (e.key === "Escape") {
      activeElement.removeEventListener("keydown", main, true);
      const focusTrapInfo = document.querySelector(".focus-trap-info__text");
      if (focusTrapInfo) {
        focusTrapInfo.textContent = "Github Tab Indent is disabled.";
      }
    }
  }
};

document.addEventListener("focusin", () => {
  const activeElement = document.activeElement;
  if (activeElement instanceof HTMLTextAreaElement) {
    activeElement.removeEventListener("keydown", main, true);
    const focusTrapInfo = document.querySelector(".focus-trap-info__text");
    if (focusTrapInfo) {
      focusTrapInfo.textContent = "Press Escape to exit and use Tab.";
    }
    activeElement.addEventListener("keydown", main, true);
  }
});

window.onload = () => {
  const textAreaElement = document.querySelector(".js-write-bucket");
  textAreaElement?.setAttribute("aria-describedby", "focus-trap-info");
  const targetElement = textAreaElement?.nextElementSibling;
  if (targetElement) {
    const ariaLiveDiv = document.createElement("div");
    ariaLiveDiv.id = "focus-trap-info";
    ariaLiveDiv.setAttribute("aria-live", "assertive");
    ariaLiveDiv.className = "focus-trap-info";
    const innerTextParagraph = document.createElement("span");
    innerTextParagraph.className = "focus-trap-info__text";
    innerTextParagraph.textContent = "Press Escape to exit and use Tab.";
    targetElement.appendChild(ariaLiveDiv);
    ariaLiveDiv.appendChild(innerTextParagraph);
  }
};
