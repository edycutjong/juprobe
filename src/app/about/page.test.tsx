import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutPage from './page';

describe('AboutPage', () => {
  it('renders about page content', () => {
    render(<AboutPage />);
    expect(screen.getByText('JupProbe')).toBeDefined();
    expect(screen.getByText('Jupiter API Monitor')).toBeDefined();
    expect(screen.getByText('WHAT IT DOES')).toBeDefined();
    expect(screen.getByText('TECH STACK')).toBeDefined();
    expect(screen.getByText('HACKATHON')).toBeDefined();
  });
});
