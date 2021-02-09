import { h } from "dom-chef";
import select from "select-dom";
import copy from "copy-text-to-clipboard";

import fetch from "../utils/api";
import { getRepoName } from "../utils/page-detect";
import { get, set } from "../utils/cache";

function chooseColorDependingOnChangesNumber(changeCount) {
  switch (true) {
    case changeCount > 0 && changeCount <= 5:
      return "#21ba45"; // green
    case changeCount > 5 && changeCount <= 10:
      return "#f2711c"; // orange
    default:
      return "#db2828"; // red
  }
}

function onClick(branchName, targetToInsertNotif) {
  const isSuccess = copy(branchName);
  const elemtAdded = targetToInsertNotif.appendChild(
    <div
      style={{
        position: "absolute",
        display: "inline",
        color: isSuccess ? "green" : "red",
      }}
    >
      {isSuccess ? `${branchName} Copied!` : "Error!"}
    </div>
  );
  setTimeout(() => {
    targetToInsertNotif.removeChild(elemtAdded);
  }, 2000);
}

async function populateChild(repoName, getMergeRequestContainerForLabel) {
  for (const mR of getMergeRequestContainerForLabel) {
    const {
      data: { changes_count, source_branch },
    } = await fetch(
      "get",
      `projects/${repoName}/merge_requests/${mR.mrNumber}`
    );
    mR.mergeRequestDiv.appendChild(
      <span
        className="badge"
        style={{
          lineHeight: "8px",
          borderRadius: "100px",
          color: "#fff",
          backgroundColor: chooseColorDependingOnChangesNumber(changes_count),
          fontSize: "12.5px",
          verticalAlign: "initial",
        }}
      >
        {!!changes_count
          ? changes_count > 1
            ? `Changes: ${changes_count}`
            : `Change: ${changes_count}`
          : "No Change"}
      </span>
    );
    mR.mergeRequestDiv.appendChild(
      <span
        onclick={() => onClick(source_branch, mR.mergeRequestDiv)}
        className="badge has-tooltip"
        data-original-title="Copy Branch Name!"
        style={{
          lineHeight: "8px",
          borderRadius: "100px",
          color: "#fff",
          backgroundColor: "#2185d0",
          fontSize: "12.5px",
          verticalAlign: "initial",
          margin: "0 5px",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        copy-mr-branch
      </span>
    );
  }
}

export default async function notifyChangeCountForCurrentMR() {
  const getMergeRequestContainerForLabel = select
    .all(".mr-list .merge-request .issuable-info")
    .map((elem) => ({
      mergeRequestDiv: elem,
      mrNumber: /([0-9]+)/.exec(
        elem.firstChild.nextSibling.firstChild.textContent
      )[0],
    }));

  if (getMergeRequestContainerForLabel.length === 0) {
    return;
  }

  const repoName = getRepoName(
    select("meta[property='og:title']").getAttribute("content")
  );

  const projectID = await get([repoName]);
  if (projectID[repoName]) {
    populateChild(projectID[repoName], getMergeRequestContainerForLabel);
  } else {
    const projects = await fetch(
      "get",
      `projects?search=${repoName}&simple=true`
    );
    const projectIDStored = await set({
      [repoName]: projects.data.filter((elem) => elem.name === repoName)[0].id,
    });
    populateChild(projectIDStored[repoName], getMergeRequestContainerForLabel);
  }
}
