import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NewForm from './NewForm';

describe('Mock Topics Tab', () => {
  it('should render the About page HTML document', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <NewForm />
        </BrowserRouter>
      </HelmetProvider>
    );
    // Assert that the title is rendered correctly
    const dropdown = screen.getByRole('button', { name: /Concept Topic/i });
    expect(dropdown).toBeInTheDocument();

  
  });
  
})