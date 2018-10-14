chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.target === 'background') {
    console.log('recieved by background');
    chrome.runtime.sendMessage(chrome.runtime.id, {target: 'App', modal: request.modal});
  }
});