import select from 'select-dom';
import OptionsSync from 'webext-options-sync';

// Features
import displayUserWhoThumbMR from './features/highlight-who-thumb';
import sortWipState from './features/sort-wip-state';
import replaceMrUrl from './features/replaceMRUrl';
import copyMR from './features/copyMR';
import displayRecordBundleSize from './features/bundlesizeRecord';

// Utils Libs
import * as pageDetect from './utils/page-detect';
import { enableFeature } from './utils/disable-feature';

async function main() {
  if (select.exists('html.refined-gitlab')) {
    console.warn(
      'Refined Gitlab has been loaded twice. If you didn’t install the developer version, this may be a bug. Please report it'
    );
    return;
  }

  document.documentElement.classList.add('refined-gitlab');
  const { disableFeature = '' } = await new OptionsSync().getAll();
  const disableFeatureSplit = disableFeature.split(',');

  if (pageDetect.isMR()) {
    const stateMR = pageDetect.isVariablePresentInURL('state');

    if (stateMR === 'opened' || !stateMR) {
      enableFeature(await displayUserWhoThumbMR, disableFeatureSplit)();
      enableFeature(sortWipState, disableFeatureSplit)();
    }
    enableFeature(copyMR, disableFeatureSplit)();
  }

  if (pageDetect.isOnSpecificMR()) {
    enableFeature(replaceMrUrl, disableFeatureSplit)();
    enableFeature(await displayRecordBundleSize, disableFeatureSplit)(
      'preprod'
    );
  }
}

main();
