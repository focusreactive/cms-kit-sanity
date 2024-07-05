import { Box, Button, Card, Stack } from '@sanity/ui';
import React from 'react';
import {
  OnItemAppend,
  Preset,
  RenderItemProps,
  RenderViewProps,
} from './types';

const DefaultRenderItem = ({ preset, onItemAppend }: RenderItemProps) => {
  const handleClick = () => {
    onItemAppend(preset.value);
  };
  return (
    <div>
      <Card>
        <pre>
          <code>{JSON.stringify(preset)}</code>
        </pre>
      </Card>
      <Button text="Add" onClick={handleClick} />
    </div>
  );
};

const DefaultRenderView = ({
  presets,
  renderItem,
  onItemAppend,
}: RenderViewProps) => {
  return (
    <div>{presets.map((preset) => renderItem({ preset, onItemAppend }))}</div>
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
        <div>
          <button onClick={onClose}>Close</button>
        </div>
        <Box>{renderView({ presets, onItemAppend, renderItem })}</Box>
      </Stack>
    </Box>
  );
};

export default BlocksBrowser;
