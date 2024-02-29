export type Props = {
  label: string;
  items: Array<{
    title: string;
    text: string;
    href: string;
    icon: string;
  }>;
  footerItems: Array<{
    title: string;
    href: string;
    icon: string;
  }>;
};
