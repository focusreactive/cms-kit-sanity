import { SanityTemplate } from '@focus-reactive/cms-kit-sanity/sanity';
import { namespace } from '../../namespace.config';
import { landingBlock } from './sa-schema';
import landingBlockJSON from './templates/sa-mock-landingblock.json';
import landingEngJSON from './templates/sa-mock-eng.json';
import landingManJSON from './templates/sa-mock-man.json';
import { TemplateArea, TemplateCategory } from '@focus-reactive/cms-kit-sanity';

// const templateLandingBlock: SanityTemplate = {
//   name: 'landingBlock',
//   type: landingBlock.name,
//   namespace: namespace.name,
//   title: 'Landing Block Default',
//   description: 'Landing Block',
//   category: TemplateCategory.feature,
//   area: TemplateArea.marketing,
//   template: landingBlockJSON,
//   height: 800 + 4, // 4 is iframe border
// };

const templateEng: SanityTemplate = {
  name: 'teamEng',
  type: landingBlock.name,
  namespace: namespace.name,
  title: 'Team Engineers',
  description: 'Landing Block',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: landingEngJSON,
  height: 800 + 4, // 4 is iframe border
};

const templateMan: SanityTemplate = {
  name: 'teamMan',
  type: landingBlock.name,
  namespace: namespace.name,
  title: 'Team Managers',
  description: 'Landing Block',
  category: TemplateCategory.feature,
  area: TemplateArea.marketing,
  template: landingManJSON,
  height: 800 + 4, // 4 is iframe border
};

export default [templateEng, templateMan];

