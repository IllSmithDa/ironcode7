import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Terms from './Terms';

describe('Mock Topics Tab', () => {
  it('should render the Privacy page HTML document', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Terms />
        </BrowserRouter>
      </HelmetProvider>
    );
    // Assert that the title is rendered correctly
    expect(screen.getByText("Iron Code Man - Terms and Conditions")).toBeInTheDocument();
  
  });
  
})