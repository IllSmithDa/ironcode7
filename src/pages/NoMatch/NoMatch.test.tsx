import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';

import { BrowserRouter } from 'react-router-dom';
import NoMatch from './NoMatch';

describe('Mock No match page', () => {
    // Renders a div with class 'darl:bg-[#1C1C1C] min-h-[100vh] w-[100%] flex flex-col justify-center text-center items-center'
    it('should remder the page', () => {
      render(
        <BrowserRouter>
          <NoMatch />
        </BrowserRouter>
      );
      const divElement = screen.getByText("404: Page does not exist!");
      expect(divElement).toBeInTheDocument();
    });
  
})