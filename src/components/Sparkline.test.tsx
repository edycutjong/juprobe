import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Sparkline } from './Sparkline';

describe('Sparkline', () => {
  it('renders correct number of points', () => {
    const { container } = render(<Sparkline points={10} />);
    const bars = container.querySelectorAll('.sparkline-bar');
    expect(bars.length).toBe(10);
  });

  it('uses provided height', () => {
    const { container } = render(<Sparkline height={50} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.height).toBe('50px');
  });
});
