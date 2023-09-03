function listenForClicks() {
  document.addEventListener('click', (e) => {

    function fix(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: 'fix'
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

    if (e.target.type === 'reset') {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    } else {
      browser.tabs.query({active: true, currentWindow: true})
        .then(fix)
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
