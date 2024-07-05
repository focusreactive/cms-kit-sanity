export type Preset = {
  name: string;
  value: {
    _key: string;
    _type: string;
  };
  meta: {
    area: string;
    category: string;
  };
};

export type OnItemAppend = (item: { _key: string }) => void;

export type RenderItemProps = {
  preset: Preset;
  onItemAppend: OnItemAppend;
};

export type RenderViewProps = {
  presets: Array<Preset>;
  onItemAppend: OnItemAppend;
  renderItem: (props: RenderItemProps) => React.ReactNode;
};
