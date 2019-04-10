import select from 'select-dom';

function replaceMRUrl() {
  const linkUrls = select.all('a[target=_blank]');
  const linkUrl = linkUrls.filter(node =>
    /\${source_branch_name\/\/\/}/gm.test(node.textContent)
  );
  if (linkUrl.length === 1) {
    const captureUrl = /\${source_branch_name\/\/\/}/gm.exec(
      linkUrl[0].textContent
    );
    if (captureUrl) {
      const [capturedText] = captureUrl;
      const replacedUrl = captureUrl.input.replace(
        capturedText,
        select('.label-branch a').textContent.replace('/', '')
      );
      linkUrl[0].innerHTML = replacedUrl;
      linkUrl[0].href = replacedUrl;
    }
  }
}

export default replaceMRUrl;
