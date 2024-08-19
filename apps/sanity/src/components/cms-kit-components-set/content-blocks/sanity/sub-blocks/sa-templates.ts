import templateBlogSection from '../root-blocks/BlogSection/sa-templates';
import gridSaTemplates from '../root-blocks/Grid/sa-templates';
import logoCloudSaTemplates from './LogoCloud/sa-templates';
import featurePointsTemplates from './FeaturePoints/sa-templates';
import styledRichTextTemplates from './StyledRichText/sa-templates';
import SimpleBadge from './Badges/sa-templates';
import TwoButtons from './Buttons/sa-templates';
import { Preset } from '@/sanity/plugins/content-blocks';


export const subBlockTemplates = [
  ...templateBlogSection,
  ...gridSaTemplates,
  ...logoCloudSaTemplates,
  ...featurePointsTemplates,
  ...styledRichTextTemplates,
  ...SimpleBadge,
  ...TwoButtons,
];

export const subBlockPresets: Preset[] = subBlockTemplates.map((t) => ({
  name: t.name,
  value: t.template,
  meta: { ...t, template: undefined },
})) as Preset[];