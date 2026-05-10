import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import { StatusBar } from './StatusBar';

describe('StatusBar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('renders initial static content', () => {
    render(<StatusBar />);
    expect(screen.getByText('SYSTEM ONLINE')).toBeDefined();
    expect(screen.getByText(/SOLANA MAINNET/i)).toBeDefined();
    expect(screen.getByText(/UPTIME/i)).toBeDefined();
  });

  it('updates latency over time', async () => {
    render(<StatusBar />);
    
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getAllByText(/ms/i).length).toBeGreaterThan(0);
  });
});
