import addDomainPermissionToggle from 'webext-domain-permission-toggle';

chrome.tabs.onUpdated.addListener((tabId, { status }) => {
  if (status === 'complete') {
    chrome.tabs.executeScript(
      tabId,
      {
        file: './content.js'
      },
      () => {
        console.log('Scripts Loaded for Refined Gitlab');
      }
    );
  }
});

// For custom domain permissions
addDomainPermissionToggle();
