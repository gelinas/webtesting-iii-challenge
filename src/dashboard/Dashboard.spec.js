import React from 'react';
import { render } from '@testing-library/react';

import Dashboard from './Dashboard';

test('shows the controls and display', () => {
    const { getByTestId } = render(<Dashboard />);
    getByTestId(/controls-panel/i);
    getByTestId(/display-panel/i);
});