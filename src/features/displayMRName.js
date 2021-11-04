import { h } from "dom-chef";
import select from "select-dom";
import copy from "copy-text-to-clipboard";

const onClick = ({ branchName, status, customSpan }) => {
  if (status === "processing") {
    return;
  }
  status = "processing";
  const isSuccess = copy(branchName);
  if (isSuccess) {
    customSpan.textContent = "Copied!";
  } else {
    customSpan.textContent = "Failed To Copy!";
  }
  setTimeout(() => {
    customSpan.textContent = branchName;
    status = "finish";
  }, 2000);
};

export default function displayMRNameOnChanges() {
  let status = null;
  const mrTabsUl = select(".merge-request-tabs");
  const branchName = select("[data-testid='ref-name']").textContent;
  const customSpan = (
    <span style={{ fontWeight: "bold", color: "#1B69B6" }}>{branchName}</span>
  );
  mrTabsUl.appendChild(
    <li
      class="pipelines-tab"
      style={{ alignItems: "flex-end" }}
      onClick={() => onClick({ branchName, status, customSpan })}
    >
      <button class="has-tooltip" title="Copy Branch name">
        {customSpan}
        <img
          alt="Copie icon"
          src="https://img.icons8.com/ios-glyphs/2x/copy.png"
          style={{ marginLeft: 5, height: "20px", width: "20px" }}
        ></img>
      </button>
    </li>
  );
}
