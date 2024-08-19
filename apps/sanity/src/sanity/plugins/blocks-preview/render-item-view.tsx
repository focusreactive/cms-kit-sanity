import React from 'react';

import { RenderItemViewProps } from '../content-blocks';
import imagePreview from './image-preview.png';
import styled from 'styled-components';

const ItemViewContainer = styled.div`
  padding: 0;
`;

const RenderItemView = ({ preset }: RenderItemViewProps) => {
  return (
    <ItemViewContainer>
      {preset.meta.screenshot ? (
        <img src={preset.meta.screenshot} alt="preview" />
      ) : (
        <div>{preset.name}</div>
      )}
    </ItemViewContainer>
  );
};

export const renderItemView = ({ preset }: RenderItemViewProps) => {
  return <RenderItemView preset={preset} />;
};
