import 'webext-dynamic-content-scripts';
import select from 'select-dom';
import displayUserWhoThumbMR from './features/highlight-who-thumb';

import * as pageDetect from './utils/page-detect';

window.select = select;

async function main() {
  console.warn('LOADED');

  if (select.exists('html.refined-gitlab')) {
    console.warn(
      'Refined Gitlab has been loaded twice. If you didn’t install the developer version, this may be a bug. Please report it'
    );
    return;
  }

  document.documentElement.classList.add('refined-gitlab');

  if (pageDetect.isPR()) {
    console.warn('PAGE PR');
    displayUserWhoThumbMR();
  }
}

document.addEventListener('DOMContentLoaded', function(_) {
  main();
});
