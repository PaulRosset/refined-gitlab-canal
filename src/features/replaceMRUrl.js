import select from "select-dom";

function replaceMrUrl() {
  const linkUrls = select.all("a[target=_blank]");
  const linkUrl = linkUrls.find(node =>
    /\${source_branch_name\/\/\/}/gm.test(node.textContent)
  );
  if (linkUrl !== undefined) {
    const captureUrl = /\${source_branch_name\/\/\/}/gm.exec(
      linkUrl.textContent
    );
    if (captureUrl) {
      const [capturedText] = captureUrl;
      const branchName = select("#merge-info-1")
        .textContent.split('"')[1]
        .replace("/", "");
      const replacedUrl = captureUrl.input.replace(capturedText, branchName);
      linkUrl.innerHTML = replacedUrl;
      linkUrl.href = replacedUrl;
    }
  }
}

export default replaceMrUrl;
