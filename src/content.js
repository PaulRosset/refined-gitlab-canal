import select from "select-dom";
import OptionsSync from "webext-options-sync";

// Features
import displayUserWhoThumbMR from "./features/highlight-who-thumb";
import changeCountLabel from "./features/changeCountLabel";
import sortWipState from "./features/sort-wip-state";
import replaceMrUrl from "./features/replaceMRUrl";
import copyMR from "./features/copyMR";
import displayRecordBundleSize from "./features/bundlesizeRecord";
import applyPrettier from "./features/applyPrettier";

// Utils Libs
import * as pageDetect from "./utils/page-detect";
import { enableFeature } from "./utils/disable-feature";

async function main() {
  if (select.exists("html.refined-gitlab")) {
    console.warn(
      "Refined Gitlab has been loaded twice. If you didn’t install the developer version, this may be a bug. Please report it",
    );
    return;
  }

  document.documentElement.classList.add("refined-gitlab");
  const { disableFeature = "" } = await new OptionsSync().getAll();
  const disableFeatureSplit = disableFeature.split(",");

  if (pageDetect.isMR()) {
    const stateMR = pageDetect.isVariablePresentInURL("state");

    if (stateMR === "opened" || !stateMR) {
      enableFeature(await displayUserWhoThumbMR, disableFeatureSplit)();
      enableFeature(changeCountLabel, disableFeatureSplit)();
      enableFeature(sortWipState, disableFeatureSplit)();
    }
  }

  if (pageDetect.isMR() || pageDetect.isListIssues()) {
    enableFeature(copyMR, disableFeatureSplit)();
  }

  const [
    isOnSpecificMR,
    isOnSpecificMRNew,
    isOnSpecificMREdit,
  ] = pageDetect.isOnSpecificMR();
  const [
    isOnSpecificIssue,
    isOnSpecificIssueNew,
  ] = pageDetect.isOnSpecificIssue();
  if (isOnSpecificMR) {
    enableFeature(replaceMrUrl, disableFeatureSplit)();
    enableFeature(
      await displayRecordBundleSize,
      disableFeatureSplit,
    )("preprod");
  }

  if (
    isOnSpecificMR ||
    isOnSpecificMREdit ||
    isOnSpecificMRNew ||
    isOnSpecificIssueNew ||
    isOnSpecificIssue
  ) {
    enableFeature(applyPrettier, disableFeatureSplit)(isOnSpecificIssue);
  }
}

main();
