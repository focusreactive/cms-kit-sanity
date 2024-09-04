import React from 'react';

type Props = {
  _type?: string;
  type?: string;
  _id?: string;
  id?: string;
  title?: string;
  name?: string;
};

const UnknownBlock = (props: Props) => {
  const { _id, id, _type, type, title, name, ...rest } = props || {};
  const blockType = _type || type || name || 'unknown';
  const blockName = title || name || 'No Name';
  const blockId = _id || id || '#';

  return (
    <div className="border-b border-gray-500">
      <h2 className="text-[30px]">{blockName}</h2>
      <p className="text-20px">{`${blockType}: ${blockId}`}</p>
      <p>
        <pre className="text-balance">
          <code>{JSON.stringify(rest)}</code>
        </pre>
      </p>
    </div>
  );
};

export default UnknownBlock;
