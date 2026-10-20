// Disable right-click context menu and show popup
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, and Ctrl+U
  document.addEventListener("keydown", (event) => {
    // Check for F12, Ctrl+Shift+I, Ctrl+Shift+J
    if (
      event.key === "F12" ||
      (event.ctrlKey &&
        event.shiftKey &&
        (event.key === "I" || event.key === "J"))
    ) {
      event.preventDefault();
    }

    // Special check for Ctrl+U
    if (event.ctrlKey && event.key === "u") {
      event.preventDefault();
    }
  });