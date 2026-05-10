import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HealthRing } from './HealthRing';

describe('HealthRing', () => {
  it('renders HEALTHY for score >= 90', () => {
    render(<HealthRing score={95} />);
    expect(screen.getByText('95%')).toBeDefined();
    expect(screen.getByText('HEALTHY')).toBeDefined();
  });

  it('renders DEGRADED for score >= 70 and < 90', () => {
    render(<HealthRing score={75} />);
    expect(screen.getByText('75%')).toBeDefined();
    expect(screen.getByText('DEGRADED')).toBeDefined();
  });

  it('renders CRITICAL for score < 70', () => {
    render(<HealthRing score={50} />);
    expect(screen.getByText('50%')).toBeDefined();
    expect(screen.getByText('CRITICAL')).toBeDefined();
  });
});
