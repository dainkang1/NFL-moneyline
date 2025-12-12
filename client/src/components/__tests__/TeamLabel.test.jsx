import React from 'react';
import { render, screen } from '@testing-library/react';
import TeamLabel from '../TeamLabel.jsx';

describe('TeamLabel', () => {
  it('renders team full name by default', () => {
    render(<TeamLabel name="Buffalo Bills" />);
    expect(screen.getByText('Buffalo Bills')).toBeInTheDocument();
  });

  it('renders team abbreviation when display="abbr"', () => {
    render(<TeamLabel name="Buffalo Bills" display="abbr" />);
    expect(screen.getByText('BUF')).toBeInTheDocument();
  });
});

