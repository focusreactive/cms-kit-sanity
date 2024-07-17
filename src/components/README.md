# Tailwind Base Set

This is Components Set for CMS-KIT

**short name:** tw-base

**styling:** Tailwind

**contains:**

- Content Blocks
- Sub Blocks
- Content Components
- Components
- pages

### Usage

1 Download Components Set folder into your project (if it's not installed yet)

`git clone git-repo-url`

2 Register Components Set in your project's config

```ts
// src/sets/config.ts

import { twBase } from './tw-base/sa-set';

export const sets = [twBase];
```

3 Install dependencies (only if you need to use generators)

`cd tw-base` folder

`pnpm i`

4 Start developing and creating content using Set's components

5 Using generators

**Add new Content Block:**

```sh
cd tw-base
pnpm run add:cblock
```

## Credits

Components Set is the essential part of [CMS-KIT](https://github.com/focusreactive/cms-kit)

**Compatible with:**

- CMS-KIT-Sanity [landing](https://focusreactive.com/cms-kit-focusreactive/) [repo](https://github.com/focusreactive/cms-kit-sanity) [docs](https://github.com/focusreactive/cms-kit-sanity/wiki/init_system)
- CMS-KIT-Storyblok **work in progress*

This project was created at **FocusReactive**, the expert consultancy for the modern web. We specialize in helping clients beat the competition and accelerate business growth. With deep expertise in headless CMS, NextJS, and eCommerce, we deliver cutting-edge solutions that prioritize your business goals.

If you're looking for expertise in headless CMS, NextJS, or eCommerce, get in touch with **FocusReactive** today. Visit our website at [focusreactive.com](https://focusreactive.com/) to learn more about how we can help you accelerate your business growth.

<image src="https://github.com/focusreactive/MVP-NextJS13-New-Features/assets/14885189/7c67e385-3f79-43e3-ba27-bada1ebddf03" width="500px"/>

**License**

_This project is licensed under the MIT License. © 2024 FocusReactive._
