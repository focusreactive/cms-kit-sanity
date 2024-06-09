import blogSectionSchema from './BlogSection/sa-schema';
import logoCloudGridSchema from './LogoCloud/sa-schema';
import gridSchema from './Grid/sa-schema';
import styledImageSchema from './StyledImage/sa-schema';
import featurePointsSchema from './FeaturePoints/sa-schema';
import styledRichTextSchema from './StyledRichText/sa-schema';
import buttonsSchema from './Buttons/sa-schema';
import badgesSchema from './Badges/sa-schema';

export const subBlocksSchemas = [
  ...logoCloudGridSchema,
  ...gridSchema,
  ...styledImageSchema,
  ...featurePointsSchema,
  ...styledRichTextSchema,
  ...buttonsSchema,
  ...badgesSchema,
  ...blogSectionSchema,
];
