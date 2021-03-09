import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import SignupPage from '../index';

describe('<SignupPage />', () => {
  it('should render its heading', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <SignupPage />
      </IntlProvider>,
    );

    expect(firstChild).toMatchSnapshot();
  });
});
