import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import Controls from './Controls';

test('provide buttons to toggle the `closed` state', () => {
    const toggleClosedMock = jest.fn();
    const { getByText } = render(<Controls
          locked={false}
          closed={true}
          toggleClosed={toggleClosedMock}
        />);
    const closedButton = getByText(/open gate/i);
    fireEvent.click(closedButton);

    expect(toggleClosedMock).toHaveBeenCalled();
})

test('provide buttons to toggle the `locked` state', () => {
    const toggleLockedMock = jest.fn();
    const { getByText } = render(<Controls
          locked={false}
          closed={true}
          toggleLocked={toggleLockedMock}
        />);
    const lockButton = getByText(/lock gate/i);
    fireEvent.click(lockButton);

    expect(toggleLockedMock).toHaveBeenCalled();
})

test('Close/open button text changes to reflect the state the door will be in if clicked', async () => {
    let display
    
    const toggleClosedMock = () => {
        display = render(<Controls
            locked={true}
            closed={true}
            toggleClosed={toggleClosedMock}
          />)
        };
    display = render(<Controls
          locked={false}
          closed={true}
          toggleClosed={toggleClosedMock}
        />);
    display.getByText(/open gate/i);
    const openButton = display.getByText(/open gate/i);
    fireEvent.click(openButton);
    await wait(() => { display.getByText(/close gate/i) });

})

test('cannot be opened if it is locked AND closed toggle button is disabled if the gate is locked', () => {
    const toggleClosedMock = jest.fn();
    const { getByText } = render(<Controls
          locked={true}
          closed={true}
          toggleClosed={toggleClosedMock}
        />);
    const openButton = getByText(/open gate/i);
    fireEvent.click(openButton);

    expect(toggleClosedMock).not.toHaveBeenCalled();
})

test('locked toggle button is disabled if the gate is open', () => {
    const toggleLockedMock = jest.fn();
    const { getByText } = render(<Controls
          locked={false}
          closed={false}
          toggleLocked={toggleLockedMock}
        />);
    const lockButton = getByText(/lock gate/i);
    fireEvent.click(lockButton);

    expect(toggleLockedMock).not.toHaveBeenCalled();
})