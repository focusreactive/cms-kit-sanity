import React from 'react';

import { withCMS } from '@focus-reactive/cms-kit-sanity';
import { ContentBlockGeneric } from '@focus-reactive/cms-kit-sanity/sanity';
import { GenericRichText } from '@focus-reactive/cms-kit-sanity/common';

import { CMSImage } from './components/CMSImage';
import { sa } from './sa-adapters';

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
  backgroundColor: string; // #111827
};

function BlockTemplate(props: Props) {
  const { title, description, image, backgroundColor } = props;
  return (
    <div className={`relative`}>
      <h3 className={`text-3xl pb-6 text-gray-600 bg-[${backgroundColor}]`}>{`BlockTemplate: ${title}`}</h3>
      <GenericRichText value={description} components={RichTextComponents} />
      {image && (
        <div className="h-80 w-full overflow-hidden my-5">
          <CMSImage imageWithMetadata={image} />
        </div>
      )}
      <details className="my-10">
        <summary>Click to view the props</summary>
        <pre className="text-sm">
          <code>{JSON.stringify(props, null, 2)}</code>
        </pre>
      </details>
    </div>
  );
}

export default withCMS({ sa })(BlockTemplate);
