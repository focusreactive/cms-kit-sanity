'use client';

import React, { useState } from 'react';

import useClickOutside from '@/hooks/useClickOutside';

import type { Props } from './types';

export default function FlyoutMenu(props: Props) {
  const { label, items, footerItems } = props;
  const [isOpen, setIsOpen] = useState(true);
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <>
      <div className="relative">
        <button
          type="button"
          className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
          aria-expanded="false"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{label}</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen ? (
          <div
            className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4"
            ref={ref}
          >
            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {items.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <svg
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <a href="#" className="font-semibold text-gray-900">
                          {item.title}
                          <span className="absolute inset-0"></span>
                        </a>
                        <p className="mt-1 text-gray-600">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/*FOOTER*/}
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {footerItems.map((item, index) => {
                  return (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      <svg
                        className="h-5 w-5 flex-none text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item.title}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
