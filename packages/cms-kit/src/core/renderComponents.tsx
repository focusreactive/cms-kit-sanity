import React from 'react';

export const createRenderComponents = (contentBlocksMap) => {
  const renderComponents = ({ content }) => {
    return (
      <>
        {content.map((item) => {
          const ContentBlock = contentBlocksMap[item.type];
          return <ContentBlock {...item} />;
        })}
      </>
    );
  };

  return renderComponents;
};
