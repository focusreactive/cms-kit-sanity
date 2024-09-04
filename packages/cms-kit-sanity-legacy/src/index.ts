import packageInfo from '../package.json';
import { setCurrentCMS } from './models/wrappers-store';
import type { HealthCheck } from './types';


export const healthCheck: HealthCheck = () => {
  return `${packageInfo.name}@${packageInfo.version}`;
};

export * from './models/withCMS';
export * from './types';
export * from './theme';
export * from './namespaces';
export * from './hooks';

export { setCurrentCMS };
