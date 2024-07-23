import logoCloudGridSchema from './LogoCloud/sa-schema';
import styledImageSchema from './StyledImage/sa-schema';
import featurePointsSchema from './FeaturePoints/sa-schema';
import styledRichTextSchema from './StyledRichText/sa-schema';
import buttonsSchema from './Buttons/sa-schema';
import badgesSchema from './Badges/sa-schema';

export const subBlocksSchemas = [
  ...logoCloudGridSchema,
  ...styledImageSchema,
  ...featurePointsSchema,
  ...styledRichTextSchema,
  ...buttonsSchema,
  ...badgesSchema,
];
