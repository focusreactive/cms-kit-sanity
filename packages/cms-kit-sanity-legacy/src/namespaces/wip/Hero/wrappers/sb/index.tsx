import React from 'react';
// @ts-ignore
import { storyblokEditable } from '@storyblok/react/rsc';
import type { SbBlokData } from '@storyblok/react/rsc';
import Hero from '@ns/Hero/components';

// @ts-ignore

interface HeroSBBlokData extends SbBlokData {
  title: string;
  description: string;
}

interface ISBHeroWrapperProps {
  blok: HeroSBBlokData;
  isDraftMode: boolean;
}

const SBHeroWrapper: React.FC<ISBHeroWrapperProps> = ({
  isDraftMode,
  blok,
}) => {
  return (
    <>
      <Hero
        containerProps={isDraftMode ? storyblokEditable(blok) : null}
        title={blok.title}
        description={blok.description}
      />
    </>
  );
};
export default SBHeroWrapper;
