import { PropsWithChildren } from 'react';

import GlobalStyles from '@Styles/global';

const Providers = ({ children }: PropsWithChildren) => (
  <>
    <GlobalStyles />
    {children}
  </>
);

export default Providers;
