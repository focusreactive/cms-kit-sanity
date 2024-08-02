import React from 'react';

import { ContentBlockGeneric } from '@focus-reactive/cms-kit-sanity/sanity';
import { GenericComponent, isDarkColor, Section, SectionProps } from '../Section';

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

export default PageBlock
