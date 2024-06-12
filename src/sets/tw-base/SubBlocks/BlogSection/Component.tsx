'use client';
import React from 'react';
import { SmartImage } from '../../ContentComponents/SmartImage';

import { AdapterFn, getCmsKey, withCMS } from '@focus-reactive/cms-kit-sanity';
import {
  SmartLink,
  SmartLinkProps,
  ContentBlockGeneric,
  ContentTypeName,
} from '@focus-reactive/cms-kit-sanity/sanity';

import { GenericRichText } from '@focus-reactive/cms-kit-sanity/common';

export type Props = ContentBlockGeneric & {
  _type: ContentTypeName;
  style: Style;
  text: string;
  posts: Array<{
    link: SmartLinkProps;
    date: string;
    text: string;
    tags: Array<{ link: SmartLinkProps }>;
    image: {
      image: {
        src: string;
        width: number;
        height: number;
        alt?: string;
      };
    };
    authors: Array<{
      avatar: {
        image: {
          src: string;
          width: number;
          height: number;
          alt?: string;
        };
      };
      link: SmartLinkProps;
      name: string;
      role: string;
    }>;
  }>;
};

export enum Style {
  threeColumn = 'three-column',
  threeColumnWithImages = 'three-column-with-images',
}

export const templates = {
  [Style.threeColumn]: { header: 'mx-auto max-w-2xl lg:mx-0' },
  [Style.threeColumnWithImages]: { header: 'w-full text-center' },
  'three-column-with-background-images': { header: 'w-full text-center' },
};

function BlogSection(props: Props) {
  const { text, style, posts } = props;

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`${templates[style]?.header}`}>
          <GenericRichText
            value={text}
            components={{
              block: {
                h2: ({ children }: { children: React.ReactElement }) => (
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {children}
                  </h2>
                ),
                normal: ({ children }: { children: React.ReactElement }) => (
                  <p className="mt-2 text-lg leading-8 text-gray-600">
                    {children}
                  </p>
                ),
              },
            }}
          />
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => {
            return (
              <article
                className="flex max-w-xl flex-col items-start justify-between"
                key={getCmsKey(post)}
              >
                {style === Style.threeColumnWithImages ? (
                  <div className={'w-full pb-5'}>
                    <SmartImage
                      imageWithMetadata={post?.image}
                      className="h-40 w-full rounded-md bg-cover bg-center"
                    />
                  </div>
                ) : null}
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime="2020-03-16" className="text-gray-500">
                    {post.date}
                  </time>
                  {post.tags.map((tag) => {
                    return (
                      <SmartLink
                        key={getCmsKey(tag)}
                        className={
                          'relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'
                        }
                      />
                    );
                  })}
                </div>
                {/*<SmartLink {...post.link}>*/}
                <div className="group relative">
                  <GenericRichText
                    value={post.text}
                    components={{
                      block: {
                        h3: ({
                          children,
                        }: {
                          children: React.ReactElement;
                        }) => (
                          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                            {children}
                          </h3>
                        ),
                        normal: ({
                          children,
                        }: {
                          children: React.ReactElement;
                        }) => (
                          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                            {children}
                          </p>
                        ),
                      },
                    }}
                  />
                </div>
                {/*</SmartLink>*/}

                {post?.authors?.map((author, index) => {
                  return (
                    <div
                      className="relative mt-8 flex items-center gap-x-4"
                      key={index}
                    >
                      <SmartImage
                        imageWithMetadata={author.avatar}
                        className="h-10 w-10 rounded-full bg-gray-50"
                      />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <a href="#">
                            <span className="absolute inset-0"></span>
                            {author.name}
                          </a>
                        </p>
                        <p className="text-gray-600">{author.role}</p>
                      </div>
                    </div>
                  );
                })}
              </article>
            );
          })}
        </div>
      </div>
    </div>
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

export default withCMS({ sa, sb })(BlogSection);
