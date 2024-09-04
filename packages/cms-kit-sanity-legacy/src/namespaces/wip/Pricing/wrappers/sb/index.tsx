import React from 'react';
// @ts-ignore
import { storyblokEditable } from '@storyblok/react/rsc';
import type { SbBlokData } from '@storyblok/react/rsc';
import Pricing from '@ns/Pricing/components';

// @ts-ignore

interface PricingSBBlokData extends SbBlokData {
  title: string;
  description: string;
}

interface ISBPricingWrapperProps {
  blok: PricingSBBlokData;
  isDraftMode: boolean;
}

const SBPricingWrapper: React.FC<ISBPricingWrapperProps> = ({
  isDraftMode,
  blok,
}) => {
  return (
    <>
      <Pricing
        containerProps={isDraftMode ? storyblokEditable(blok) : null}
        title={blok.title}
        description={blok.description}
      />
    </>
  );
};
export default SBPricingWrapper;
