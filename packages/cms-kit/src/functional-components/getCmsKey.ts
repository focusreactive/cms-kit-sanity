import { getCurrentCMS } from '../core/cmsContext';

export const getCmsKey = (props) => {
  const getKey = {
    sa: (props) => props._key,
    sb: (props) => props.uid,
    na: (props) => props.ind,
  };
  const cms = getCurrentCMS();

  return getKey[cms.name](props);
};
