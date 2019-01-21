import { h } from 'dom-chef';
import select from 'select-dom';

function sortWipState() {
  const getOriginalRootNodeMR = select('.mr-list');
  const getAllMrEntry = select.all('.merge-request', getOriginalRootNodeMR);
  const sortedMR = getAllMrEntry
    .map(mrEntry => {
      const text = select('.merge-request-title-text a', mrEntry).text;
      return { text, mrEntry };
    })
    .sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()))
    .map(elem => elem.mrEntry);
  for (const node in getAllMrEntry) {
    getAllMrEntry[node].remove();
  }
  for (const node in sortedMR) {
    getOriginalRootNodeMR.appendChild(sortedMR[node]);
  }
}

export default sortWipState;
