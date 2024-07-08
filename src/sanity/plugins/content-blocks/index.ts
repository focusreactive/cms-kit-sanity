import { defineArrayMember, definePlugin, defineType } from 'sanity';
import { functionalTypes } from './functional-types/types';
import { componentsWithBlocksInput } from './componentsPreviewUtil';
import { createTemplateView } from './functional-types/contentBlockActions/schema';
import { ContentBlocksArg, contentBlocksProps } from './types';

export * from './types';

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

export const CMSKitContentBlocks = definePlugin<ContentBlocksArg>(
  ({
    blockTypes = [],
    presets = [],
    renderItem,
    renderItemView,
    renderView,
  }) => {
    const params = {
      presets,
      renderItem,
      renderItemView,
      renderView,
    };
    return {
      name: 'content-blocks',
      // title: 'CMS-KIT Content Blocks',
      schema: {
        name: 'content-blocks',
        types: [
          ...blockTypes,
          ...functionalTypes,
          contentBlocks({
            blockTypes,
            name: 'content-blocks',
            params,
          }),
          createTemplateView(params),
          // contentBlocks({ blockTypes, name: 'glob.templateView', params }),
        ],
      },
    };
  },
);
