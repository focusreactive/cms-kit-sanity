import { Box, Button, Card, Stack, Text } from '@sanity/ui';
import React from 'react';
import {
  OnItemAppend,
  Preset,
  RenderItemProps,
  RenderViewProps,
} from './types';
import styled from 'styled-components';

const ItemContainer = styled.div`
  font-size: 10px;
  overflow: hidden;
  background-color: #242424b5;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DefaultRenderItem = ({ preset, onItemAppend }: RenderItemProps) => {
  const handleClick = () => {
    onItemAppend(preset.value);
  };

  const height = 100 + Math.round(Math.random() * 300);
  return (
    <ItemContainer>
      <div style={{ height }}>
        <p style={{ textWrap: 'wrap' }}>{preset.meta.title}</p>
        <p>blalala</p>
      </div>
      <button onClick={handleClick}>Add</button>
    </ItemContainer>
  );
};

const ViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  gap: 16px;
`;

const PopupInnerContainer = styled.div`
  max-height: 40vh;
  overflow-y: auto;
`;

const PopupToolbar = styled.div`
  display: flex;
`;

const ViewColumnContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-base: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  width: 50px;
`;

const RenderColumn = ({
  presets,
  position,
  columns,
  renderItem,
  onItemAppend,
}: RenderViewProps & { position: number; columns: number }) => {
  const presetsColumns = presets.filter((_, i) => i % columns === position);
  return (
    <ViewColumnContainer>
      {presetsColumns.map((preset, i) => (
        <div key={preset.value._key}>
          {renderItem({ preset, onItemAppend })}
          {/* <p>{`item ${i}`}</p> */}
        </div>
      ))}
    </ViewColumnContainer>
  );
};

const DefaultRenderView = ({
  presets,
  renderItem,
  onItemAppend,
}: RenderViewProps) => {
  const columns = 3;
  const rendersArray = new Array(columns).fill(1).map((_, i) => i);

  return (
    <div>
      <PopupInnerContainer>
        <ViewContainer>
          {rendersArray.map((c) => (
            <RenderColumn
              key={c}
              presets={presets}
              renderItem={renderItem}
              onItemAppend={onItemAppend}
              position={c}
              columns={columns}
            />
          ))}
        </ViewContainer>
      </PopupInnerContainer>
    </div>
  );
};

type Props = {
  onClose: () => void;
  onItemAppend: OnItemAppend;
  presets: Preset[];
  renderView?: (props: RenderViewProps) => React.ReactNode;
  renderItem?: (props: RenderItemProps) => React.ReactNode;
};

const BlocksBrowser = ({
  onClose,
  onItemAppend,
  presets,
  renderView = DefaultRenderView,
  renderItem = DefaultRenderItem,
}: Props) => {
  return (
    <Box>
      <Stack>
        <PopupToolbar>
          <button onClick={onClose}>Close</button>
        </PopupToolbar>
        <Box>{renderView({ presets, onItemAppend, renderItem })}</Box>
      </Stack>
    </Box>
  );
};

export default BlocksBrowser;
