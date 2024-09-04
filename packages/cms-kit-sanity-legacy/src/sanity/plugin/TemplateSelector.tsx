'use client';
import React from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@sanity/ui';
import { AddIcon } from '@sanity/icons';
import { useRouter } from 'sanity/router';
import { useClient, useFormValue } from 'sanity';

import { TEMPL_SEL } from './constants';
import { retrieveContentBlockFromLS } from './model/copy-paste';
import { addBlockToDraftDocument } from './utils';

interface TemplateSelectorProps {
  renderDefault: (props: any) => React.ReactElement;
  inputId: string;
  schemaType: {
    name: string;
    of: { name: string }[];
  };
}

const InputContainer = styled.div`
  fieldset {
    div[data-ui='Stack']
      > div[data-ui='Grid']:has(button[data-ui='MenuButton']) {
      display: none;
    }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  width: 100%;
`;

const handleOpenTemplates = ({ router, id, inputId, compatibleTypes }) => {
  const isPaneOpen = router.state.panes?.some(
    p => p[0].params?.type === TEMPL_SEL,
  );

  return () => {
    const currentRouterState = router.state;

    if (isPaneOpen) {
      currentRouterState.panes.pop();
    }

    currentRouterState.panes.push([
      {
        id: 'blocks',
        params: {
          type: TEMPL_SEL,
          id,
          inputId,
          compatibleTypes,
        },
      },
    ]);

    router.navigate(currentRouterState);
  };
};

const TemplateSelector: React.FC<TemplateSelectorProps> = props => {
  const { renderDefault, inputId, schemaType } = props;
  const data = useFormValue([]) as { _id: string; [key: string]: string };
  const router = useRouter();
  const client = useClient({ apiVersion: '2023-03-25' });

  const compatibleTypes = schemaType.of.map(v => v.name);

  const handleClick = handleOpenTemplates({
    router,
    id: data._id as string,
    inputId,
    compatibleTypes,
  });

  const handlePaste = async () => {
    const blockData = retrieveContentBlockFromLS();

    if (!blockData || typeof blockData !== 'object') {
      alert('Something went wrong.');

      return;
    }

    if (compatibleTypes.includes(blockData._type)) {
      await addBlockToDraftDocument({
        client,
        block: blockData,
        fieldName: inputId,
        documentId: data._id,
      });
    } else {
      alert(
        'The block you are trying to paste is not compatible with this field.',
      );
    }
  };

  return (
    <InputContainer>
      {renderDefault(props)}
      <Grid style={{ marginTop: 12 }}>
        <ButtonsContainer>
          <Button
            mode="ghost"
            selected={false}
            text="Add Template..."
            icon={AddIcon}
            onClick={handleClick}
            disabled={window.location.pathname.startsWith('/presentation/')}
          />
          <Button
            mode="ghost"
            selected={false}
            text="Paste..."
            icon={AddIcon}
            onClick={handlePaste}
          />
        </ButtonsContainer>
      </Grid>
    </InputContainer>
  );
};

export default TemplateSelector;
