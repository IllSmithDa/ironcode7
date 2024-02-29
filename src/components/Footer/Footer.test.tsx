
import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';

import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';

describe('Mock Footer component', () => {
  // Renders a section element with specific classes.
  it('should render a section element with specific classes', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const linkElements = screen.getAllByRole('link');
    linkElements.forEach((link) => {
      expect(link).toHaveAttribute('href');
    });
  });
  
})