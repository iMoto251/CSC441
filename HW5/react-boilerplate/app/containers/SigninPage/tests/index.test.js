import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import SigninPage from '../index';

describe('<SigninPage />', () => {
  it('should render its heading', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <SigninPage />
      </IntlProvider>,
    );

    expect(firstChild).toMatchSnapshot();
  });
});
