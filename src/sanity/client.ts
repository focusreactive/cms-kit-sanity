import { createClient } from '@sanity/client/stega';

import config from './config';

export const client = createClient(config);
