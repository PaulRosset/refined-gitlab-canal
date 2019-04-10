export function enableFeature(fn, featureDisabled) {
  if (featureDisabled.includes(fn.name)) {
    return () => {};
  }
  return fn;
}
