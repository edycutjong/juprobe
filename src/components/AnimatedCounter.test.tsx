import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AnimatedCounter } from './AnimatedCounter';

describe('AnimatedCounter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback): number => {
      setTimeout(() => cb(performance.now()), 16);
      return 1;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders and animates to target', async () => {
    render(<AnimatedCounter target={100} duration={100} prefix="$" suffix="K" />);
    
    // Initially might render 0
    expect(screen.getByText(/\$0K/i)).toBeDefined();

    await act(async () => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByText(/\$100K/i)).toBeDefined();
  });
});
