import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Privacy from './Privacy';

describe('Mock Topics Tab', () => {
  it('should render the Privacy page HTML document', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Privacy />
        </BrowserRouter>
      </HelmetProvider>
    );
    // Assert that the title is rendered correctly
    expect(screen.getByText("Iron Code Man - Privacy Policy")).toBeInTheDocument();
  
  });
  
})