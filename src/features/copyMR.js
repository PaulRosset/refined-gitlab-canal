import { h } from "dom-chef";
import select from "select-dom";
import copy from "copy-text-to-clipboard";

function onclick(evt) {
  let innerTextMr = evt.target.offsetParent.innerText.split("\n");
  if (innerTextMr.length > 0) {
    innerTextMr = innerTextMr[0];
    const matchedTextMr = innerTextMr.match(/(\s\d of [0-9]+ [a-z]+ [a-z]+$)/);
    if (matchedTextMr !== null) {
      innerTextMr = innerTextMr.substring(0, matchedTextMr.index).trim();
    }
  } else {
    innerTextMr = "";
  }
  const nbMR = evt.target.innerText.trim();
  const isSuccess = copy(
    `[${nbMR}/${innerTextMr}](${window.location.origin}${
      window.location.pathname
    }/${nbMR.replace(/!|#| /, "")})`
  );
  const elemtAdded = evt.target.appendChild(
    <div style={{ position: "absolute", color: isSuccess ? "green" : "red" }}>
      {isSuccess ? "Copied!" : "Error!"}
    </div>
  );
  setTimeout(() => {
    evt.target.removeChild(elemtAdded);
  }, 2000);
}

export default function copyMR() {
  select.all(".issuable-reference").forEach((elem) => {
    elem.setAttribute("data-original-title", "Copy URL as MD link!");
    elem.className += " has-tooltip";
    elem.style.textDecoration = "underline";
    elem.style.fontWeight = "bold";
    elem.style.cursor = "pointer";
    elem.onclick = onclick;
  });
}
