import select from 'select-dom';

// Features
import displayUserWhoThumbMR from './features/highlight-who-thumb';
import sortWipState from './features/sort-wip-state';

// Utils Libs
import * as pageDetect from './utils/page-detect';

function main() {
  if (select.exists('html.refined-gitlab')) {
    console.warn(
      'Refined Gitlab has been loaded twice. If you didn’t install the developer version, this may be a bug. Please report it'
    );
    return;
  }

  document.documentElement.classList.add('refined-gitlab');

  if (pageDetect.isMR()) {
    displayUserWhoThumbMR();
    sortWipState();
  }
}

main();
