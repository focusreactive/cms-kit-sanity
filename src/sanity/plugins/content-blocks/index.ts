import {
  SchemaTypeDefinition,
  defineArrayMember,
  definePlugin,
  defineType,
} from 'sanity';
import { BlocksInput, BlocksPreview } from './BlocksInput';
import { functionalTypes } from './functional-types/types';
import { componentsWithBlocksInput } from './componentsPreviewUtil';
import { createTemplateView } from './functional-types/contentBlockActions/schema';

type contentBlocksProps = {
  blockTypes: SchemaTypeDefinition[];
  name: string;
  params: object;
};

const contentBlocks = ({
  blockTypes,
  name,
  params = {},
}: contentBlocksProps) => {
  const ofTypes = (blockTypes || [])
    .filter((t) => t.name)
    .filter(
      (t) =>
        t.kitOptions?.group === 'BLOCK' || t.kitOptions?.group === 'COMPONENT',
    )
    .map((t) => defineArrayMember({ type: t.name }));

  return defineType({
    name,
    type: 'array',
    of: ofTypes,
    components: componentsWithBlocksInput(params),
  });
};

type ContentBlocksArg = {
  sets?: Array<object>;
  presets?: Array<object>;
  blockTypes?: SchemaTypeDefinition[];
};

export const CMSKitContentBlocks = definePlugin<ContentBlocksArg>(
  ({ blockTypes = [], presets = [] }) => {
    const params = {
      presets,
    };
    return {
      name: 'content-blocks',
      // title: 'CMS-KIT Content Blocks',
      schema: {
        name: 'content-blocks',
        types: [
          ...blockTypes,
          ...functionalTypes,
          contentBlocks({ blockTypes, name: 'content-blocks', params }),
          createTemplateView(params),
          // contentBlocks({ blockTypes, name: 'glob.templateView', params }),
        ],
      },
    };
  },
);
