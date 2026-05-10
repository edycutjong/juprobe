import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the footer content', () => {
    render(<Footer />);
    expect(screen.getByText(/JUPROBE/i)).toBeDefined();
    expect(screen.getByText(/Colosseum Frontier Hackathon 2026/i)).toBeDefined();
  });
});
