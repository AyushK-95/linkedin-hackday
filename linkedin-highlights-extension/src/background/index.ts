// Background service worker for LinkedIn Highlights extension

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('LinkedIn Highlights extension installed');
    
    // Open welcome page
    // Remove any chrome.tabs.create({ url: 'http://localhost:3000' }) calls
  }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  if (tab.url?.includes('linkedin.com')) {
    // Inject the highlights widget
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      files: ['injected.js']
    });
  } else {
    // Open the web app
    // Remove from onInstalled
    // chrome.tabs.create({ url: 'http://localhost:3000' });
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'getProfileData':
      // Forward profile data request to content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab.id) {
          chrome.tabs.sendMessage(currentTab.id, { action: 'extractProfile' }, (response) => {
            sendResponse(response);
          });
        }
      });
      return true; // Keep message channel open for async response

    case 'injectWidget':
      // Inject widget into current tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab.id) {
          chrome.scripting.executeScript({
            target: { tabId: currentTab.id },
            files: ['injected.js']
          });
        }
      });
      sendResponse({ success: true });
      break;

    case 'openWebApp':
      // Open the web app in a new tab
      // Remove from onMessage
      // case 'openWebApp':
      //   chrome.tabs.create({ url: 'http://localhost:3000' });
      //   sendResponse({ success: true });
      //   break;
      sendResponse({ success: true });
      break;

    default:
      sendResponse({ error: 'Unknown action' });
  }
});

// Handle tab updates to inject content script when needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('linkedin.com')) {
    // Content script will be automatically injected via manifest
    console.log('LinkedIn page loaded, content script ready');
  }
}); 