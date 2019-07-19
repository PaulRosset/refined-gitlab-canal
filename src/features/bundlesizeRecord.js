import { h } from 'dom-chef';
import select from 'select-dom';
import axios from 'axios';

async function displayRecord(env) {
  const linkUrl = select
    .all('a[target=_blank]')
    .filter(node => /https:\/\/player/gm.test(node.textContent));
  if (linkUrl.length !== 1) {
    return;
  }
  const bundleSizeUrlFromBranch = linkUrl[0].textContent.replace(
    'index.html',
    `build:${env}-bytes-size-on-js`
  );
  try {
    const { data: bundleSizeForCurrentBranch } = await axios.get(
      bundleSizeUrlFromBranch
    );
    const { data: bundleSizeForMasterBranch } = await axios.get(
      `https://player.mycanal.fr/one/preprod/v2/build:${env}-bytes-size-on-js`
    );
    const branchName = select('.label-branch').firstChild.textContent;
    const areaToInjectBundleSize = select('.mr-widget-section');
    const styleBox = {
      padding: 5,
      borderRadius: 5,
      margin: '0 10px',
      color: '#FFF',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      fontSize: 13,
    };
    const records = (
      <div style={{ padding: '16px 16px 0 16px', display: 'flex' }}>
        <div style={{ ...styleBox, background: '#fd7e14' }}>
          <div style={{ fontWeight: 'bold' }}>
            {branchName} ({env})
          </div>
          {bundleSizeForCurrentBranch ? (
            <div>
              {(bundleSizeForCurrentBranch / 1000.059).toFixed(4)} kB gzipped
            </div>
          ) : (
            <div>unknown</div>
          )}
        </div>
        <div style={{ ...styleBox, background: '#007bff' }}>
          <div style={{ fontWeight: 'bold' }}>master ({env})</div>
          {bundleSizeForMasterBranch ? (
            <div>
              {(bundleSizeForMasterBranch / 1000.059).toFixed(4)} kB gzipped
            </div>
          ) : (
            <div>unknown</div>
          )}
        </div>
      </div>
    );
    areaToInjectBundleSize.insertBefore(
      records,
      areaToInjectBundleSize.firstChild
    );
  } catch (e) {
    console.error(
      `[REFINED-GITLAB] An error happened while fetching data: ${e.message}`
    );
  }
}

export default displayRecord;
