import { COUNTRIES } from './countries';

const LOCATION = {
  REMOTE: 'remote',
};

export const LOCATION_OPTIONS = [
  { label: 'Remote', value: LOCATION.REMOTE },
  ...COUNTRIES,
];
