export type Props = {
  menuItems: Array<{
    label: string;
    icon: string;
    submenu?: {
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
  }>;
};
