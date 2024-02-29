import React from 'react';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
}
export const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="text-blue-500">
      <Link href={'/'} /> {children}
    </button>
  );
};

export default Button;
