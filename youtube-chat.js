(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  // Max height for chat window in pixels
  const maxHeight = 240;

  function findChat() {
    return document.getElementById('chatframe')
      .contentDocument
      .getElementById('chat');
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === 'fix') {
      findChat()
        .style
        .setProperty('max-height', maxHeight + 'px');
    } else if (message.command === 'reset') {
      findChat()
        .style
        .removeProperty('max-height');
    }
  });
})();
