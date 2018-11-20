const sendChromeMessage = (target, type, modal) => {
  chrome.runtime.sendMessage(
    chrome.runtime.id,
    {
      target,
      type,
      modal
    }
  );
}

export default sendChromeMessage;