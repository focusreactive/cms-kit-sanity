// import { templateView } from './plugin/TemplateView';
import { templateView } from '@/sanity/common-schema';
import {
  GroupOptions,
  type ExtendedType,
  type TypeOptions,
} from '@/sanity/types';

type createTypeGeneratorsProps = {
  namespace: {
    name: string;
    title: string;
    shortTitle: string;
  };
};

export const defineField = field => field;

export const createTypeGenerators = ({
  namespace,
}: createTypeGeneratorsProps) => {
  const defineType = ({
    type,
    options = {},
  }: {
    type: ExtendedType;
    options: TypeOptions;
  }): ExtendedType => {
    type.kitOptions = { ...type.kitOptions, ...options };
    type.name = `${namespace.name}.${type.name}`;
    type.title = `[${namespace.shortTitle}] ${type.title}`;
    if (
      options?.group === GroupOptions.BLOCK ||
      options?.group === GroupOptions.COMPONENT
    ) {
      type.description =
        type.description ||
        `${namespace.title} > ${type.title} Component Block`;
      type.fields.unshift({
        name: 'blockActions',
        type: templateView.name,
        // name: 'templateView',
        // type: 'templateView',
      });
    } else {
      type.description =
        type.description || `${namespace.title} > ${type.title}`;
    }

    return type;
  };

  type TypeFn = (props: { df: (options: object) => object }) => ExtendedType;

  const defineBlockType = (typeFn: TypeFn) => {
    const type = typeFn({ df: defineField });

    return defineType({ type, options: { group: GroupOptions.BLOCK } });
  };

  const defineComponentType = (typeFn: TypeFn) => {
    const type = typeFn({ df: defineField });

    return defineType({ type, options: { group: GroupOptions.COMPONENT } });
  };

  const defineUtilityType = (typeFn: TypeFn) => {
    const type = typeFn({ df: defineField });

    return defineType({ type, options: { group: GroupOptions.UTILS } });
  };

  return { defineBlockType, defineUtilityType, defineComponentType };
};

export const findBlockRoot = (types: Array<ExtendedType>): string => {
  try {
    const rootType = types.find(
      tp => tp.kitOptions?.group === GroupOptions.BLOCK,
    );
    const typeName = rootType?.name;
    if (!typeName) {
      throw new Error(`can't find root block type`);
    }

    return typeName;
  } catch (error) {
    throw new Error(`can't find root block type`);
  }
};

export const findComponentRoot = (types: Array<ExtendedType>): string => {
  try {
    const componentType = types.find(
      tp => tp.kitOptions?.group === GroupOptions.COMPONENT,
    );

    const typeName = componentType?.name;

    if (!typeName) {
      throw new Error(`can't find root component type`);
    }

    return typeName;
  } catch (error) {
    throw new Error(`can't find root component type`);
  }
};
