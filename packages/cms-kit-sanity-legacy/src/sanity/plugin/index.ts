import { PluginOptions, definePlugin, defineType } from 'sanity';
import type { DefaultDocumentNodeResolver } from 'sanity/desk';
import { deskTool as baseDeskTool } from 'sanity/desk';

import type { NameSpaceName } from '@/types';
import commonTypes, { templateView } from '@/sanity/common-schema';
import componentTypes from '@/namespaces/sa-schemas';
import { initTemplatesStore } from '@/sanity/templates';
import type { ComponentTypes, Kit } from '@/sanity/types';
import { setExternalDatasetConfig } from '@/sanity/initExternalDataset';

import { TemplateView } from './TemplateView';
import TemplateSelector from './TemplateSelector';
import TemplatesUI from './TemplatesUI';
import { TEMPL_SEL } from './constants';

export { TemplateSelector };

const getTypes = (
  types: ComponentTypes,
  namespaces: Array<string>,
  customNamespaces?: Array<Kit>,
) => {
  const customNamespaceTypes = customNamespaces
    ? customNamespaces.reduce(
        (acc, ns) => ({ ...acc, [ns.name]: ns[ns.name] }),
        {},
      )
    : {};
  const allTypes = {
    ...types,
    ...customNamespaceTypes,
  };

  const typesArray = namespaces.flatMap(name => allTypes[name]?.types || []);

  return typesArray;
};

const createContentBlocksType = (
  namespaces: Array<string>,
  customNamespaces?: Array<Kit>,
) =>
  defineType({
    name: 'content-blocks',
    type: 'array',
    // @ts-ignore
    of: getTypes(componentTypes, namespaces, customNamespaces)
      .filter(type => type.kitOptions?.group === 'BLOCK')
      .map(type => ({ type: type.name })),
    components: {
      // @ts-ignore
      field: TemplateSelector,
    },
  });

type CmsKitPluginArg = {
  namespaces?: Array<string>;
  customNamespaces?: Array<Kit>;
  sets?: Array<Kit>;
  pageSchema: any;
  projectId: string;
  dataset: string;
};

export const cmsKitPlugin = definePlugin<CmsKitPluginArg>(
  ({ namespaces = [], customNamespaces = [], sets = customNamespaces, pageSchema, dataset, projectId }) => {
    customNamespaces = sets;
    if (customNamespaces.length) {
      namespaces.push(...customNamespaces.map(ns => ns.name));
    }

    setExternalDatasetConfig({ dataset, projectId });
    initTemplatesStore(namespaces, sets);
    // @ts-ignore
    templateView.components.field = TemplateView;
    const templateSelector = defineType({
      name: TEMPL_SEL,
      type: 'document',
      fields: [
        {
          name: 'title',
          type: 'string',
        },
      ],
    });

    const SmartLink = commonTypes.find(
      schema => schema.name === 'glob.SmartLink',
    );

    SmartLink.fields.push({
      name: 'slug',
      type: 'reference',
      hidden: ({ parent }) => parent?.type === 'url',
      to: [{ type: pageSchema.name }],
      title: 'Page slug',
      description: 'Path to the page within the Next.js app',
    });

    return {
      name: 'cms-kit',
      schema: {
        name: 'cms-kit-components',
        types: [
          templateView,
          templateSelector,
          ...commonTypes,
          createContentBlocksType(namespaces, customNamespaces),
          // @ts-ignore
          ...getTypes(componentTypes, namespaces, customNamespaces),
        ],
      },
    };
  },
);

export const deskTool = (props = {} as any): PluginOptions => {
  const defaultDocumentNode: DefaultDocumentNodeResolver = (S, ctx) => {
    const schemaType = ctx.schema.get(ctx.schemaType);

    if (schemaType?.name === TEMPL_SEL) {
      return S.document().views([
        // S.view.form(),
        S.view.component(TemplatesUI).title('Template Selector').options({
          previewUrl: props.previewUrl,
        }),
      ]);
    }

    if (props.defaultDocumentNode) {
      return props.defaultDocumentNode(S, ctx);
    }

    return S.document();
  };

  return baseDeskTool({ ...props, defaultDocumentNode });
};
