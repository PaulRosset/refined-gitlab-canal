import select from "select-dom";

import { get } from "../utils/cache";
import fetch from "./api";

export const getCleanPathname = () =>
  location.pathname.replace(/^[/]|[/]$/g, "");

export const isMR = () => {
  const splittedPath = getCleanPathname().split("/");
  return /^merge_requests/.test(splittedPath[splittedPath.length - 1]);
};

export const isOnSpecificMR = () => {
  const splittedPath = getCleanPathname().split("/");
  const indexMR = splittedPath.indexOf("merge_requests");
  return indexMR > -1 && !isNaN(splittedPath[indexMR + 1]);
};

export const isVariablePresentInURL = variable => {
  return new URL(window.location.href).searchParams.get(variable);
};

export const getRepoName = metaTitle => {
  const splittedTitle = metaTitle.split("/");
  return splittedTitle[splittedTitle.length - 1].trim();
};

export const getCurrentProjectID = async () => {
  const repoName = getRepoName(
    select("meta[property='og:title']").getAttribute("content"),
  );
  const projectID = await get([repoName]);
  return projectID;
};
