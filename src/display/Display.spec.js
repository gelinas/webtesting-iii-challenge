import React from 'react';
import '@testing-library/jest-dom/extend-expect' 
import { render } from '@testing-library/react';

import Display from './Display';


test('default is unlocked and open AND displays if gate is open/closed and if it is locked/unlocked', () => {
    const { getByText } = render(<Display />);
    getByText(/unlocked/i); // cannot sanity check because locked is within unlocked string
    getByText(/open/i);
});

test('displays Closed if the `closed` prop is `true`', () => {
    const { getByText } = render(<Display locked={false} closed={true} />);
    getByText(/closed/i);
});

test('displays Open if the `closed` prop is `false`', () => {
    const { getByText } = render(<Display locked={false} closed={false} />);
    getByText(/open/i);
});

test('displays Locked if the `locked` prop is `true`', () => {
    const { getByText } = render(<Display locked={true} closed={true} />);
    getByText(/locked/i);
});

test('displays Unlocked if the `locked` prop is `false`', () => {
    const { getByText } = render(<Display locked={false} closed={true} />);
    getByText(/unlocked/i);
});

test('when `locked` or `closed` use the `red-led` class', () => {
    const display = render(<Display locked={true} closed={true} />);
    const lock = display.queryByText(/locked/i);
    expect(lock).toBeInTheDocument();
    expect(lock).toHaveClass('red-led');
    const closed = display.queryByText(/closed/i)
    expect(closed).toBeInTheDocument();
    expect(closed).toHaveClass('red-led');
});

test('when `unlocked` or `open` use the `green-led` class', () => {
    const display = render(<Display locked={false} closed={false} />);
    const lock = display.queryByText(/unlocked/i);
    expect(lock).toBeInTheDocument();
    expect(lock).toHaveClass('green-led');
    const closed = display.queryByText(/open/i)
    expect(closed).toBeInTheDocument();
    expect(closed).toHaveClass('green-led');
});