---
to: ContentBlocks/<%= h.inflection.camelize(name, false) %>/Component.tsx
---
import React from 'react';

import { withCMS } from '@focus-reactive/cms-kit-sanity';
import { ContentBlockGeneric } from '@focus-reactive/cms-kit-sanity/sanity';
import { GenericRichText } from '@focus-reactive/cms-kit-sanity/common';

import { sa } from './sa-adapters';
import { SmartImage } from '../../ContentComponents/SmartImage';
import { Section, SectionProps } from '../../ContentComponents/Section';

const RichTextComponents = {
  block: {
    h2: ({ children }: { children: React.ReactElement }) => (
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {children}
      </h2>
    ),
    normal: ({ children }: { children: React.ReactElement }) => (
      <p className="mt-2 text-lg leading-8 text-gray-600">{children}</p>
    ),
  },
};

type Props = ContentBlockGeneric & {
  title: string;
  description: object;
  image: object;
  backgroundColor: string;
  blockOptions: SectionProps;
};

function <%= h.inflection.camelize(name, false) %>(props: Props) {
  const { title, description, image, backgroundColor, blockOptions } = props;
  return (
    <Section
      backgroundOptions={blockOptions.backgroundOptions}
      layoutOptions={blockOptions.layoutOptions}
    >
      <h3
        className={`text-3xl pb-6 bg-[${backgroundColor}]`}
      >{`<%= h.inflection.camelize(name, false) %>: ${title}`}</h3>
      <GenericRichText value={description} components={RichTextComponents} />
      {image && (
        <div className="h-80 w-full overflow-hidden my-5">
          <SmartImage imageWithMetadata={image} />
        </div>
      )}
      <details className="my-10">
        <summary>Click to view the props</summary>
        <pre className="text-sm">
          <code>{JSON.stringify(props, null, 2)}</code>
        </pre>
      </details>
    </Section>
  );
}

export default withCMS({ sa })(<%= h.inflection.camelize(name, false) %>);
