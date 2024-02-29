import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import About from './About';

describe('Mock Topics Tab', () => {
  it('should render the About page HTML document', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <About />
        </BrowserRouter>
      </HelmetProvider>
    );
    // Assert that the title is rendered correctly
    expect(screen.getByText("Purpose")).toBeInTheDocument();
  
  });
  
})