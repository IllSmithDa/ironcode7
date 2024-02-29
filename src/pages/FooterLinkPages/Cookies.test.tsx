import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Cookies from './Cookies';

describe('Mock Topics Tab', () => {
  it('should render the Cookles page HTML document', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Cookies />
        </BrowserRouter>
      </HelmetProvider>
    );
    // Assert that the title is rendered correctly
    expect(screen.getByText("Iron Code Man - Cookie Usage")).toBeInTheDocument();
  
  });
  
})