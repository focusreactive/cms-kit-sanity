import React from 'react';

import { withCMS } from '@focus-reactive/cms-kit-sanity';
import { ContentBlockGeneric } from '@focus-reactive/cms-kit-sanity/sanity';

import {
  GenericComponent,
  Section,
  SectionProps,
  isDarkColor,
} from '../../ContentComponents/Section';
import { sa } from './sa-adapters';
import { sb } from './sb-adapters';

type Props = ContentBlockGeneric & {
  components: GenericComponent[];
  blockOptions: SectionProps;
  renderSanityComponent: (options: object) => any;
};

function PageBlock({ components, blockOptions, renderSanityComponent }: Props) {
  const isDarkTheme = isDarkColor(
    blockOptions?.backgroundOptions?.colorSelector,
  );

  return (
    <Section
      backgroundOptions={blockOptions.backgroundOptions}
      layoutOptions={blockOptions.layoutOptions}
    >
      {components.map(
        renderSanityComponent({
          customProps: { isDarkTheme: isDarkTheme },
        }),
      )}
    </Section>
  );
}

// @ts-ignore
export default withCMS({ sa, sb })(PageBlock);
