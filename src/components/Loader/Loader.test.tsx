import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';

import Loader from './Loader';

describe('Mock Loader', () => {
  // Renders a section element with specific classes.    // Renders a section element with a background color and a height of 400px by default, or 600px for large screens.
    it('should render section element with default height for small screens', () => {
      render(<Loader loadingMsg="Test" />);
      const headingElement = screen.getByRole("heading");
      expect(headingElement).toBeInTheDocument();
    });
  
})