import Header from './Header/sa-schema';
import NewsLetter from './NewsLetter/sa-schema';
import Testimonials from './Testimonials/sa-schema';
import Contact from './Contact/sa-schema';
import Content from './Content/sa-schema';
import CTA from './CTA/sa-schema';
import Team from './Team/sa-schema';
import PageBlock from './PageBlock/sa-schema';
import NavHeader from './elements/NavHeader/sa-schema';

export const types = [
  ...Header,
  ...NewsLetter,
  ...Testimonials,
  ...Contact,
  ...Content,
  ...CTA,
  ...Team,
  ...PageBlock,
  ...NavHeader,
];
