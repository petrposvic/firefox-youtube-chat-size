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

  function findChatFrame() {
    return document.getElementById('chatframe')
      .contentDocument;
  }

  function findChat() {
    return findChatFrame()
      .getElementById('chat');
  }

  function findReactionControlPanel() {
    return findChatFrame()
      .getElementById('reaction-control-panel');
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === 'fix') {
      findChat()
        .style
        .setProperty('max-height', maxHeight + 'px');
    } else if (message.command === 'remove-heart') {
      findReactionControlPanel()
        .style
        .setProperty('display', 'none');
    } else if (message.command === 'reset') {
      findChat()
        .style
        .removeProperty('max-height');
      findReactionControlPanel()
        .style
        .removeProperty('display');
    }
  });
})();
