import React from 'react';

import { ContentBlockGeneric } from '@focus-reactive/cms-kit-sanity/sanity';
import {
  GenericComponent,
  isDarkColor,
  Section,
  SectionProps,
} from '../Section';

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
          // TODO: we can switch to React Context for passing props to nested components. Now it's the same logic
          customProps: { isDarkTheme },
        }),
      )}
    </Section>
  );
}

export default PageBlock;
