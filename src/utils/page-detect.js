export const getCleanPathname = () =>
  location.pathname.replace(/^[/]|[/]$/g, '');

export const isMR = () => {
  const splittedPath = getCleanPathname().split('/');
  return /^merge_requests/.test(splittedPath[splittedPath.length - 1]);
};

export const isOnSpecificMR = () => {
  const splittedPath = getCleanPathname().split('/');
  return (
    splittedPath[splittedPath.length - 2] === 'merge_requests' &&
    !isNaN(splittedPath[splittedPath.length - 1])
  );
};

export const isVariablePresentInURL = variable => {
  return new URL(window.location.href).searchParams.get(variable);
};

export const getRepoName = metaTitle => {
  const splittedTitle = metaTitle.split('/');
  return splittedTitle[splittedTitle.length - 1].trim();
};
