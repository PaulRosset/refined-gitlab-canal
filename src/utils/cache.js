export function get(search) {
  return new Promise(resolve => {
    chrome.storage.local.get(search, async res => {
      return resolve(res);
    });
  });
}

export function set(dataToStore) {
  return new Promise(resolve => {
    chrome.storage.local.set(dataToStore, async res => {
      return resolve(res);
    });
  });
}
