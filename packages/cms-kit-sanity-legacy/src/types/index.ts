export * from './cms';

export type HealthCheck = () => string;

export enum NameSpaceName {
  base = 'base',
  land = 'land',
}
export type NameSpace = {
  name: string;
  title: string;
  shortTitle: string;
};

