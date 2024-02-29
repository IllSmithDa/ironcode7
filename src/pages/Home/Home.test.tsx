
import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';

import Home from './Home';

describe('Mock Home', () => {
  it('should render the section with the main image, title, subtitle, and topic selection prompt', () => {
    render(<Home />);
  
    const mainImage = screen.getByAltText('main title image');
    const title = screen.getByText('IronCodeMan');
    const subtitle = screen.getByText('A Reference for Programmers');
    const prompt = screen.getByText('Select topic or language');
  
    expect(mainImage).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(prompt).toBeInTheDocument();
  });
  
})