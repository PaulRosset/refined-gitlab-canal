import { h } from "dom-chef";
import select from "select-dom";

import fetch from "../utils/api";
import { getRepoName } from "../utils/page-detect";
import { get, set } from "../utils/cache";

async function populateChild(repoName, displayAvatarForThumbStruct) {
  for (const mR of displayAvatarForThumbStruct) {
    const [
      { data: currentUser },
      awardEmojiRes,
      discussionsRes,
    ] = await Promise.all([
      fetch("get", "/user"),
      fetch(
        "get",
        `projects/${repoName}/merge_requests/${mR.mrNumber}/award_emoji`,
      ),
      fetch(
        "get",
        `projects/${repoName}/merge_requests/${mR.mrNumber}/discussions`,
      ),
    ]);
    const isMRCommentedByUser = discussionsRes.data.some(discussion => {
      for (let i = 0, len = discussion.notes.length; i < len; i += 1) {
        return discussion.notes[i].author.username === currentUser.username;
      }
    });
    mR.upVotesDiv.style.textAlign = "center";
    mR.upVotesDiv.style.borderBottom = "1px solid #1aaa55";
    mR.upVotesDiv.appendChild(
      <div className="highlight-who-thumb">
        {awardEmojiRes.data
          .filter(elem => elem.name === "thumbsup")
          .map(elem => {
            if (elem.user.username === currentUser.username) {
              mR.upVotesDiv["title"] = "You Thumbed UP!";
              mR.upVotesDiv.children[0].style.color = "#1aaa55";
              if (isMRCommentedByUser) {
                mR.commentDiv.firstElementChild.lastElementChild.style.color =
                  "#1aaa55";
                mR.commentDiv.firstElementChild["title"] = "You commented!";
              }
            }
            return (
              <img
                width="16"
                class="avatar avatar-inline s16 js-lazy-loaded has-tooltip"
                data-original-title={elem.user.name}
                alt=""
                src={`${elem.user.avatar_url}?width=16`}
              />
            );
          })}
      </div>,
    );
  }
}

async function displayUserWhoThumbMR() {
  const displayAvatarForThumbStruct = select
    .all(".mr-list .merge-request .controls .issuable-upvotes")
    .map(elem => ({
      upVotesDiv: elem,
      mrNumber: /([0-9]+)/.exec(
        select(".issuable-comments .has-tooltip", elem.parentNode).href,
      )[0],
      commentDiv: elem.parentNode.lastElementChild,
    }));

  if (displayAvatarForThumbStruct.length === 0) {
    return;
  }

  const repoName = getRepoName(
    select("meta[property='og:title']").getAttribute("content"),
  );

  const projectID = await get([repoName]);
  if (projectID[repoName]) {
    populateChild(projectID[repoName], displayAvatarForThumbStruct);
  } else {
    const projects = await fetch(
      "get",
      `projects?search=${repoName}&simple=true`,
    );
    const projectIDStored = await set({
      [repoName]: projects.data.filter(elem => elem.name === repoName)[0].id,
    });
    populateChild(projectIDStored[repoName], displayAvatarForThumbStruct);
  }
}

export default displayUserWhoThumbMR;
