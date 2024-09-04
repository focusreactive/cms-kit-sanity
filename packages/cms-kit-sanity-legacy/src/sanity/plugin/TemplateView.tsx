'use client';
import React from 'react';
import { Badge, Dialog, Box, Card } from '@sanity/ui';
import { useFormValue } from 'sanity';
import styled from 'styled-components';

import { getTemplates } from '@/sanity/templates';
import type { ContentBlockData } from '@/sanity/types';

import { saveContentBlockToLS } from './model/copy-paste';

type Props = {
  path: Array<string | { _key: string }>;
};

enum DialogTabs {
  templates = 'templates',
  json = 'json',
}
const InnerArea = styled.div`
  box-sizing: border-box;
  background-color: rgb(130 130 130 / 7%);
  padding: 16px;
  height: 100%;
  position: relative;
`;

type AvailableTemplates = {
  _type: string;
};

function AvailableTemplates({ _type }: AvailableTemplates) {
  const templatesStore = getTemplates();
  const availableTemplates = templatesStore.templates.filter(
    tm => tm?.type === _type,
  );

  return (
    <Box>
      {availableTemplates.map(tm => (
        <Card key={tm.name}>{tm.name}</Card>
      ))}
    </Box>
  );
}

const TextArea = styled.textarea`
  box-sizing: border-box;
  border: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  padding: 8px;
`;

type CurrentJSONProps = {
  data: object;
};

function CurrentJSON({ data }: CurrentJSONProps) {
  return <TextArea value={JSON.stringify(data, null, 2)} readOnly />;
}

export function TemplateView({ path }: Props) {
  const currentPath = path.slice(0, -1);
  const data = useFormValue(currentPath);
  const [open, setOpen] = React.useState<boolean>(false);
  const [tab, setTab] = React.useState<DialogTabs>(DialogTabs.templates);
  const onClose = React.useCallback(() => setOpen(false), []);
  const onOpen = (openTab: DialogTabs) => () => {
    setTab(openTab);
    setOpen(true);
  };

  const tabsConfig = {
    [DialogTabs.templates]: {
      title: 'Available Templates',
      // TODO: we need to handle cases when data comes empty
      // @ts-ignore
      component: <AvailableTemplates _type={data._type} />,
    },
    [DialogTabs.json]: {
      component: <CurrentJSON data={data as object} />,
      title: 'The Current Value',
    },
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Badge
          onClick={onOpen(DialogTabs.templates)}
          tone="primary"
          padding={2}
          fontSize={6}
          style={{ cursor: 'pointer' }}
        >
          Templates...
        </Badge>
        <Badge
          onClick={onOpen(DialogTabs.json)}
          mode="outline"
          tone="default"
          padding={2}
          fontSize={6}
          style={{ cursor: 'pointer' }}
        >
          Current Value
        </Badge>
        <Badge
          onClick={() => saveContentBlockToLS(data as ContentBlockData)}
          mode="outline"
          tone="default"
          padding={2}
          fontSize={6}
          style={{ cursor: 'pointer' }}
        >
          Copy
        </Badge>
      </div>
      {open && (
        <Dialog
          header={tabsConfig[tab].title}
          id="dialog-example"
          onClose={onClose}
          zOffset={1000}
          width={800}
        >
          <Box padding={0} style={{ height: 600, position: 'relative' }}>
            <InnerArea>{tabsConfig[tab].component}</InnerArea>
          </Box>
        </Dialog>
      )}
    </div>
  );
}
