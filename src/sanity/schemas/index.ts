import landing from '@/components/here_reusable_components_lets_decide_the_folders_name/pages/landing/sa/schemas'
import author from './author'

import page from './documents/page'
import post from './documents/post'
import duration from './objects/duration'
import milestone from './objects/milestone'
import timeline from './objects/timeline'
import home from './singletons/home'
import settings from './singletons/settings'
import { blockTypes } from '@/components/here_reusable_components_lets_decide_the_folders_name/sa-set'

export const schemaTypes = [
  ...landing,
  ...author,
  page,
  post,
  duration,
  milestone,
  timeline,
  home,
  settings,
  ...blockTypes
]
