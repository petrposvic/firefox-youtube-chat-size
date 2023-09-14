function listenForClicks() {
  document.addEventListener('click', (e) => {

    function fix(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: 'fix'
      });
    }

    function removeHeart(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: 'remove-heart'
      });
    }

    function reset(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: 'reset'
      });
    }

    function reportError(error) {
      console.error(`Could not beastify: ${error}`);
    }

    if (e.target.tagName !== 'BUTTON' || !e.target.closest('#popup-content')) {
      // Ignore when click is not on a button within <div id="popup-content">.
      return;
    }

    if (e.target.id === 'fix') {
      browser.tabs.query({active: true, currentWindow: true})
        .then(fix)
        .catch(reportError);
    } else if (e.target.id === 'remove-heart') {
      browser.tabs.query({active: true, currentWindow: true})
        .then(removeHeart)
        .catch(reportError);
    } else if (e.target.id === 'reset') {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
  console.error(`Failed to execute script: ${error.message}`);
}

browser.tabs
  .executeScript({file: "/youtube-chat.js"})
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
