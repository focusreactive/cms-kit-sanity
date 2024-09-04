'use client';
import React from 'react';

import { getCmsKey, withCMS } from '../../../../models/withCMS';
import type { Props } from './types';

const saConvertProps = cmsProps => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};

const sbConvertProps = cmsProps => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};

function StatsPoints(props: any) {
  const { value, title } = props;

  return (
    <div className="mx-auto flex max-w-xs flex-col gap-y-4">
      <dt className="text-base leading-7 text-gray-600">{title}</dt>
      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        {value}
      </dd>
    </div>
  );
}

const StatsPointsWithCMS = withCMS({ sa: saConvertProps, sb: sbConvertProps })(
  StatsPoints,
);

function Stats(props: Props) {
  const { stats } = props;

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat, i) => (
            <StatsPointsWithCMS key={getCmsKey(stat) + i.toString()} />
          ))}
        </dl>
      </div>
    </div>
  );
}

const sa = cmsProps => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};

const sb = cmsProps => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};

export default withCMS({ sa, sb })(Stats);
