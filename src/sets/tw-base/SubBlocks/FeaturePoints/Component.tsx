import React from 'react';

import { featurePointStyles } from '../../ContentComponents/Section/common-schemas';
import { AdapterFn, getCmsKey, withCMS } from '@focus-reactive/cms-kit-sanity';
import type { SmartLinkProps } from '@focus-reactive/cms-kit-sanity/sanity';
import { classnames } from '@focus-reactive/cms-kit-sanity/common';
import { SmartImage } from '../../ContentComponents/SmartImage';

const iconStyle = featurePointStyles.map((style) => style.value);

type Feature = {
  title: string;
  description: string;
  icon: { icon: { imageAsset: object } };
  link?: SmartLinkProps;
};

type Props = {
  features: Feature[];
  columns: number;
  style: (typeof iconStyle)[number];
  withSecondary: boolean;
  isFirst: boolean;
  isDarkTheme: boolean;
};

const Card = ({
  style,
  feature,
  isDarkTheme,
}: {
  style: (typeof iconStyle)[number];
  feature: Feature;
  isDarkTheme: boolean;
}) => {
  switch (style) {
    case 'icon-top':
      return (
        <div className="relative flex flex-col">
          <dt className="text-base font-semibold leading-7 text-gray-900">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <SmartImage
                className="h-5 w-5 text-indigo-600 invert"
                imageWithMetadata={feature.icon}
                aria-hidden="true"
              />
            </div>
            {feature.title}
          </dt>
          <dd className="mt-4 flex flex-col leading-7">
            <p className="text-gray-600">{feature.description}</p>
            <p className="mt-6">
              <a
                href={feature.link?.href}
                className="text-sm font-semibold leading-6 text-indigo-600"
              >
                {feature.link?.text}
                <span aria-hidden="true"> →</span>
              </a>
            </p>
          </dd>
        </div>
      );
    case 'icon-title-inline':
      return (
        <div className="relative flex flex-col">
          <dt
            className={classnames(
              'flex items-center gap-x-3 text-base font-semibold leading-7',
              {
                'text-white': isDarkTheme,
              },
            )}
          >
            <SmartImage
              className={classnames('h-5 w-5', {
                invert: isDarkTheme,
              })}
              aria-hidden="true"
              imageWithMetadata={feature.icon}
            />
            {feature.title}
          </dt>
          <dd className="mt-4 flex flex-col leading-7">
            <p className="text-gray-600">{feature.description}</p>
            <p className="mt-6">
              <a
                href={feature?.link?.href}
                className={classnames(
                  'text-sm font-semibold leading-6 text-indigo-600',
                  {
                    'text-indigo-400': isDarkTheme,
                  },
                )}
              >
                {feature?.link?.text}
                <span aria-hidden="true"> →</span>
              </a>
            </p>
          </dd>
        </div>
      );
    case 'icon-left-with-background':
      return (
        <div className="relative pl-16">
          <dt
            className={classnames(
              'text-base font-semibold leading-7 text-gray-900',
              {
                'text-white': isDarkTheme,
              },
            )}
          >
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <SmartImage
                className="h-5 w-5 text-indigo-600 invert"
                aria-hidden="true"
                imageWithMetadata={feature.icon}
              />
            </div>
            {feature.title}
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">
            {feature.description}
          </dd>
        </div>
      );
    case 'no-icon':
      return (
        <div className="relative flex flex-col">
          <dt
            className={classnames(
              'flex items-center gap-x-3 text-base font-semibold leading-7',
              {
                'text-white': isDarkTheme,
              },
            )}
          >
            {feature.title}
          </dt>
          <dd className="mt-1 flex flex-col leading-7">
            <p className="text-gray-600">{feature.description}</p>
          </dd>
        </div>
      );
    case 'icon-left-separate-title':
      return (
        <div className="relative pl-9">
          <dt
            className={classnames(
              'text-base font-semibold leading-7 text-gray-900',
              {
                'text-white': isDarkTheme,
              },
            )}
          >
            <div className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center">
              <SmartImage
                className="text-indigo-600"
                aria-hidden="true"
                imageWithMetadata={feature.icon}
              />
            </div>
            {feature.title}
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">
            {feature.description}
          </dd>
        </div>
      );
    case 'icon-left':
    default:
      return (
        <div className="relative pl-9">
          <dt
            className={classnames('inline font-semibold text-gray-900', {
              'text-white': isDarkTheme,
            })}
          >
            <SmartImage
              className={classnames(
                'absolute left-1 top-1 h-5 w-5 text-indigo-600',
                {
                  invert: isDarkTheme,
                },
              )}
              aria-hidden="true"
              imageWithMetadata={feature.icon}
            />
            {feature.title}{' '}
          </dt>
          <dd
            className={classnames('inline', {
              'text-gray-400': isDarkTheme,
            })}
          >
            {feature.description}
          </dd>
        </div>
      );
  }
};

function FeaturePoints(props: Props) {
  const { features, columns, style, isFirst, isDarkTheme } = props;
  const withLink = style === 'icon-title-inline' || style === 'icon-top';

  if (columns === 3) {
    return (
      <dl
        className={classnames(
          'mt-24 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3',
          { 'md:grid-cols-2': !withLink },
          { '!mt-0': isFirst },
        )}
      >
        {features.map((feature) => (
          <Card
            key={getCmsKey(feature)}
            feature={feature}
            style={style}
            isDarkTheme={isDarkTheme}
          />
        ))}
      </dl>
    );
  }

  if (columns === 2) {
    return (
      <div
        className={classnames('mx-auto mt-16 sm:mt-20 lg:mt-24', {
          '!mt-0': isFirst,
        })}
      >
        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <Card
              key={getCmsKey(feature)}
              feature={feature}
              style={style}
              isDarkTheme={isDarkTheme}
            />
          ))}
        </dl>
      </div>
    );
  }

  return (
    <dl
      className={classnames(
        'mt-10 space-y-8 text-base leading-7 text-gray-600',
        { '!mt-0': isFirst },
      )}
    >
      {features.map((feature) => (
        <Card
          key={getCmsKey(feature)}
          feature={feature}
          style={style}
          isDarkTheme={isDarkTheme}
        />
      ))}
    </dl>
  );
}

const sa: AdapterFn = (cmsProps) => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};

const sb: AdapterFn = (cmsProps) => {
  return {
    key: getCmsKey(cmsProps),
    ...cmsProps,
  };
};

export default withCMS({ sa, sb })(FeaturePoints);
