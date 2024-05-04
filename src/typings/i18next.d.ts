import 'i18next';

import common from '../../public/locales/en/common.json';
import signIn from '../../public/locales/en/signIn.json';
import signUp from '../../public/locales/en/signUp.json';

const en = {
  common,
  signIn,
  signUp,
};

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof en;
  }
}
