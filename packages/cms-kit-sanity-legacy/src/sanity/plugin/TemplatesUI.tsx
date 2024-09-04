import React from 'react';
import styled from 'styled-components';
import { useClient } from 'sanity';
import { useRouter } from 'sanity/router';
import { nanoid } from 'nanoid';

import type { TemplatesStore } from '@/sanity/templates';
import { selectTemplates } from '@/sanity/templates';
import type { SanityTemplate } from '@/sanity/types';

import { TEMPL_SEL } from './constants';
import { addBlockToDraftDocument } from './utils';

const CardContainer = styled.div`
  border-radius: 0.5rem;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.25;
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  justify-content: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button<{
  variant:
    | 'primary'
    | 'secondary'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'ghost'
    | 'link';
  size?: 'sm' | 'lg' | 'icon';
}>`
  background-color: transparent;
  border: 1px black solid;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  ring-offset: #fff;
  transition:
    color 0.15s,
    background-color 0.15s;

  &:hover {
    cursor: pointer;
  }

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 2px;
    ring: 2;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  /* Variants */
  ${props => {
    switch (props.variant) {
      case 'default':
        return `
          background-color: #000;
          color: #fff;
          &:hover {
            background-color: rgba(0, 0, 0, 0.9);
          }
        `;
      case 'primary':
        return `
          background-color: #3ab564;
          border: none;
          color: #fff;
          &:hover {
            background-color: #329253;
          }
        `;
      case 'destructive':
        return `
          background-color: #ff0000;
          color: #fff;
          &:hover {
            background-color: rgba(255, 0, 0, 0.9);
          }
        `;
      case 'outline':
        return `
          border: 1px solid #000;
          background-color: #fff;
          color: #000;
          &:hover {
            background-color: #000;
            color: #fff;
          }
        `;
      case 'secondary':
        return `
          background-color: #ffffff;
          color: #1d1d1d;
          &:hover {
            background-color: rgba(128, 128, 128, 0.8);
          }
        `;
      case 'ghost':
        return `
          &:hover {
            background-color: #000;
            color: #fff;
          }
        `;
      case 'link':
        return `
          color: #000;
          text-decoration: underline;
          text-underline-offset: 0.25rem;
          &:hover {
            text-decoration: none;
          }
        `;
      default:
        return '';
    }
  }}

  /* Sizes */
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          height: 2.25rem;
          padding: 0.75rem;
        `;
      case 'lg':
        return `
          height: 2.75rem;
          padding: 2rem;
        `;
      case 'icon':
        return `
          height: 2.25rem;
          width: 2.25rem;
        `;
      default:
        return `
          height: 2.5rem;
          padding: 1rem;
        `;
    }
  }}
`;

// Reusable TemplateSection component
interface TemplateSectionProps {
  title: string;
  count: string;
  children: React.ReactNode;
}

const TemplateSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TemplateSectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  text-transform: uppercase;
`;

const TemplateSectionCount = styled.span`
  font-size: 1rem;
`;

const TemplateSection: React.FC<TemplateSectionProps> = ({
  title,
  count,
  children,
}) => {
  return (
    <div>
      <TemplateSectionContainer>
        <TemplateSectionTitle>
          {title}
          <span>{' templates:'}</span>
        </TemplateSectionTitle>
        <TemplateSectionCount>{count}</TemplateSectionCount>
      </TemplateSectionContainer>
      {children}
    </div>
  );
};

const Icon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  fill: white;
  stroke: black;
`;

function IconCopy() {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      // stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </Icon>
  );
}

function IconEnhance() {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      // stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 11-6 6v3h9l3-3" />
      <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
    </Icon>
  );
}

function IconFavorite() {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      // stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z" />
      <path d="M12 12v.01" />
    </Icon>
  );
}

function IconPreview() {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      // stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 1 0 0 2z" />
      <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
      <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
    </Icon>
  );
}

type Params = {
  type: string;
  id: string;
  inputId: string;
  compatibleTypes: string;
};

const getParams = (state): Params => {
  try {
    const pane = state.panes.find(pn => pn[0]?.params?.type === TEMPL_SEL);

    return pane[0]?.params;
  } catch {
    return null;
  }
};

type TemplateViewProps = {
  template: SanityTemplate;
  onAppend: (data: object) => void;
  params: Params;
  previewUrl: string;
};

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

const Details = (template: SanityTemplate) => (
  <DetailsContainer>
    <span>{template.area}</span>
    <span>{template.category}</span>
    <span>{template.name}</span>
    <span>{template.namespace}</span>
    <span>{template.title}</span>
    <span>{template.description}</span>
    <span>{template.type}</span>
  </DetailsContainer>
);

const CardContent = styled.div`
  padding: 0 1.5rem;
  position: relative;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

const Iframe = styled.iframe`
  border: none;
  width: 1024px;
  height: ${props => props.height}px;
  scale: 0.3;
  transform-origin: 0 0;
`;

const IframeContainer = styled.div<{ height: number }>`
  container-type: inline-size;
  height: ${props => props.height * 0.3}px;

  height: ${props => props.height * 0.425}px;

  ${Iframe} {
    scale: 0.425;
  }
`;

const TemplateView = ({
  template,
  onAppend,
  params,
  previewUrl,
}: TemplateViewProps) => {
  const handleCLick = () => {
    onAppend(template);
  };

  const queryFromTemplate = encodeURIComponent(
    JSON.stringify(template.template),
  );

  const fieldFullName = params.inputId.split('.');
  const fieldName = fieldFullName[fieldFullName.length - 1];

  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>{template.title}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <IframeContainer height={template.height}>
          <Iframe
            height={template.height}
            title="Template Preview"
            loading="lazy"
            src={`${previewUrl}/single-template?t=${queryFromTemplate}`}
          />
        </IframeContainer>
      </CardContent>
      <CardFooter>
        {/* <Button title="Preview" variant="secondary">
          <IconPreview />
        </Button>
        <Button title="Copy" variant="secondary">
          <IconCopy />
        </Button>
        <Button title="Favorite" variant="secondary">
          <IconFavorite />
        </Button>
        <Button title="Enhance" variant="secondary">
          <IconEnhance />
        </Button> */}
        <Button variant="primary" onClick={handleCLick}>
          Append to
          <span
            style={{ fontWeight: 'bold', margin: '0 5px' }}
          >{`${fieldName}`}</span>
          field
        </Button>
      </CardFooter>
    </CardContainer>
  );
};

type CategoryProps = {
  category: TemplatesStore['byCategory'][0];
  onAppend: (data: object) => void;
  params: Params;
  previewUrl: string;
};

const Category = ({
  category,
  onAppend,
  params,
  previewUrl,
}: CategoryProps) => {
  if (!category.templates.length) {
    return null;
  }

  return (
    <TemplateSection
      title={category.category}
      count={`${category.templates.length}/${category.count}`}
    >
      {category.templates.map(tp => (
        <TemplateView
          key={tp.name}
          template={tp}
          onAppend={onAppend}
          params={params}
          previewUrl={previewUrl}
        />
      ))}
    </TemplateSection>
  );
};

const TemplatesUI = ({ options }: any) => {
  const router = useRouter();
  const client = useClient({ apiVersion: '2023-03-25' });

  const params = getParams(router.state);
  if (!params) {
    return null;
  }

  const normalizedCompatibleTypes = params.compatibleTypes.split(',');
  const templatesByCategory = selectTemplates({
    types: normalizedCompatibleTypes,
  });

  if (!templatesByCategory.length) {
    return null;
  }

  const handleAppend = async (template: SanityTemplate) => {
    await addBlockToDraftDocument({
      documentId: params.id,
      client,
      fieldName: params.inputId,
      block: {
        ...template.template,
        customTitle: template.title,

        _key: nanoid(),
      },
    });
  };

  return (
    <div style={{ maxWidth: '40rem', margin: '0 auto', padding: '2rem' }}>
      <div style={{ gap: '2rem' }}>
        {templatesByCategory.map(cat => (
          <Category
            key={cat.category}
            category={cat}
            onAppend={handleAppend}
            params={params}
            previewUrl={options.previewUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplatesUI;
