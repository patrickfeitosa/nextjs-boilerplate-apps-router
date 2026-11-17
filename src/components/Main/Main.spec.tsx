import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Main } from './Main';

describe('<Main />', () => {
  it('renders the default translated heading', () => {
    render(<Main />);

    expect(screen.getByRole('heading', { level: 1, name: /next\.js boilerplate/i })).toBeVisible();
  });

  it('renders the provided title and description', () => {
    render(<Main description="custom description" title="custom title" />);

    expect(screen.getByRole('heading', { name: 'custom title' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'custom description' })).toBeVisible();
  });
});
