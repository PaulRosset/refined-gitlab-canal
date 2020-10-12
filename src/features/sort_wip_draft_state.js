import { h } from "dom-chef";
import select from "select-dom";

function sortWipDraftState() {
  const getOriginalRootNodeMR = select(".mr-list");
  const getAllMrEntry = select.all(".merge-request", getOriginalRootNodeMR);
  const sortedMR = getAllMrEntry
    .map((mrEntry) => {
      const text = select(".merge-request-title-text a", mrEntry).text;
      return { text, mrEntry };
    })
    .sort((a, b) => {
      const isDraftA = a.text.indexOf("Draft");
      const isWipA = a.text.indexOf("WIP");
      const isDraftB = b.text.indexOf("Draft");
      const isWipB = b.text.indexOf("WIP");

      return isDraftA + isWipA - (isDraftB + isWipB);
    })
    .map((elem) => elem.mrEntry);
  for (const node in getAllMrEntry) {
    getAllMrEntry[node].remove();
  }
  for (const node in sortedMR) {
    getOriginalRootNodeMR.appendChild(sortedMR[node]);
  }
}

export default sortWipDraftState;
