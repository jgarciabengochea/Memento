chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.target === 'background') {
    // send to create deck modal
    if (request.type === 'createDeck') {
      chrome.runtime.sendMessage(
        chrome.runtime.id, 
        {
          target: 'App', 
          modal: request.modal
        }
      );
    }
    // send to create card modal
    if (request.type === 'deckDone' || request.type === 'cardDone') {
      chrome.runtime.sendMessage(
        chrome.runtime.id, 
        {
          target: 'App', 
          modal: request.modal, 
          deck: request.deck
        }
      );
    }
  }
});