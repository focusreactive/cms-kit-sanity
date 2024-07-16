import React from 'react';

import { RenderItemViewProps } from '../content-blocks';

const RenderItemView = ({ preset }: RenderItemViewProps) => {
  const height = 100 + Math.round(Math.random() * 300);

  return (
    <div style={{ height }}>
      <h3>Name:</h3>
      <p>{preset.name}</p>
      <h3>Title:</h3>
      <h4>{preset.meta?.title}</h4>
    </div>
  );
};

export const renderItemView = ({ preset }: RenderItemViewProps) => {
  return <RenderItemView preset={preset} />;
};
