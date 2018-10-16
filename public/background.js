chrome.runtime.onMessage.addListener((request, sender, senderResponse) => {
  if (request.target === 'background') {
    
    if (request.type === 'returnHome') {
      chrome.runtime.sendMessage(
        chrome.runtime.id, 
        {
          target: 'App', 
          modal: request.modal
        }
      );
    }
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
          deckEditing: request.deck
        }
      );
    }
    if (request.type === 'viewDecks') {
      chrome.runtime.sendMessage(
        chrome.runtime.id, 
        {
          target: 'App', 
          modal: request.modal
        }
      );
    }
    if (request.type === 'startQuiz') {
      chrome.runtime.sendMessage(
        chrome.runtime.id, 
        {
          target: 'App', 
          modal: request.modal,
          quizDeck: request.deck
        }
      );
    }
    if (request.type === 'results') {
      chrome.runtime.sendMessage(
        chrome.runtime.id, 
        {
          target: 'App', 
          type: 'results',
          modal: request.modal,
          results: request.results
        }
      );
    }
  }
});