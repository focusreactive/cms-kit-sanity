'use client';

import React, { Suspense } from 'react';
import { renderSanityComponent } from '@focus-reactive/cms-kit-sanity/sanity-next';
import { sets } from '@/components/cms-kit-components-set/config';
import { ContentBlockData } from '@focus-reactive/cms-kit-sanity/sanity';
import { presets, twBase } from '@/components/cms-kit-components-set/sa-set';

type Props = {
  name: string;
};

const RenderPreset = ({ name }: Props) => {
  const preset = presets.find((p) => p.name === name);
  const Component = twBase['tw-base'].blocksMap[preset?.value._type];
  if (!Component) {
    return null;
  }
  // if (!preset?.value?._key) {
  //   return null;
  // }
  return (
    <Suspense fallback={<p>loading...</p>}>
      <div style={{ borderRadius: 4, border: '2px solid black' }}>
        {renderSanityComponent({ sets })(preset?.value)}
      </div>
    </Suspense>
  );
};

export default RenderPreset;
