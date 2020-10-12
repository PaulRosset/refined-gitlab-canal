import { h } from "dom-chef";
import select from "select-dom";

import fetch from "../utils/api";
import { getRepoName } from "../utils/page-detect";
import { get, set } from "../utils/cache";

async function populateChild(repoName, displayUnresolvedThreadsStruct) {
  for (const mR of displayUnresolvedThreadsStruct) {
    const discussionsRes = await fetch(
      "get",
      `projects/${repoName}/merge_requests/${mR.mrNumber}/discussions`
    );

    const numOfOpenedThreads = discussionsRes.data.reduce(
      (total, discussion) => {
        if (discussion.notes[0].resolvable && !discussion.notes[0].resolved) {
          total++;
        }
        return total;
      },
      0
    );
    if (numOfOpenedThreads === 0) {
      return;
    }
    mR.commentDiv.appendChild(
      <span
        class="has-tooltip"
        data-original-title={`${numOfOpenedThreads} unresolved threads`}
        style={{ color: "red" }}
      >
        ({numOfOpenedThreads})
      </span>
    );
  }
}

async function displayUnresolvedThreads() {
  const displayUnresolvedThreadsStruct = select
    .all(".mr-list .merge-request .controls .issuable-comments")
    .map((elem) => ({
      mrNumber: /([0-9]+)/.exec(
        select(".issuable-comments .has-tooltip", elem.parentNode).href
      )[0],
      commentDiv: elem,
    }));

  if (displayUnresolvedThreadsStruct.length === 0) {
    return;
  }

  const repoName = getRepoName(
    select("meta[property='og:title']").getAttribute("content")
  );

  const projectID = await get([repoName]);
  if (projectID[repoName]) {
    populateChild(projectID[repoName], displayUnresolvedThreadsStruct);
  } else {
    const projects = await fetch(
      "get",
      `projects?search=${repoName}&simple=true`
    );
    const projectIDStored = await set({
      [repoName]: projects.data.filter((elem) => elem.name === repoName)[0].id,
    });
    populateChild(projectIDStored[repoName], displayUnresolvedThreadsStruct);
  }
}

export default displayUnresolvedThreads;
