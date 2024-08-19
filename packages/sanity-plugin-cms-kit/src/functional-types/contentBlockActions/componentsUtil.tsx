import { BlockActions } from './BlockActions';

export const components = (params) => ({
  field: (props) => <BlockActions {...props} {...params} />,
});
