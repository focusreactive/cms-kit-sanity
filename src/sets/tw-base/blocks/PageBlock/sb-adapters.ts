export const sb: AdapterFn = (cmsProps) => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};
