export const getCleanPathname = () =>
  location.pathname.replace(/^[/]|[/]$/g, '');

export const isPR = () => {
  const splittedPath = getCleanPathname().split('/');
  return /^merge_requests/.test(splittedPath[splittedPath.length - 1]);
};

export const getRepoName = metaTitle => {
  const splittedTitle = metaTitle.split('/');
  return splittedTitle[splittedTitle.length - 1].trim();
};
