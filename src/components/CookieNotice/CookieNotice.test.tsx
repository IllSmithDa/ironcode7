/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect } from 'vitest';
import { /*fireEvent,*/ render} from '../../utils/test-utils';
import CookieNotice from './CookieNotice';
import { BrowserRouter } from 'react-router-dom';

describe('Mock Cookie Notice', () => {    
  it('should render a hidden div when cookies have been accepted', () => {
    // Arrange
    const { container } = render(
      <BrowserRouter>
        <CookieNotice />
      </BrowserRouter>
    );

    // Act
    const divElement = container.querySelector('div');

    // Assert
    expect(divElement).toHaveClass('hidden');
  });
  it('should set \'iron_man_code_cookie_accept\' to false when localStorage is empty', () => {
    // Arrange
    localStorage.clear();

    // Act
    render(
      <BrowserRouter>
        <CookieNotice />
      </BrowserRouter>
    );

    // Assert
    expect(localStorage.getItem('iron_man_code_cookie_accept')).toBe('false');
  });
  /*
  it('should navigate to \'/cookies\' route when \'Learn More\' button is clicked', () => {
    // Arrange
    const { getByText } = render(
      <BrowserRouter>
      <CookieNotice />
    </BrowserRouter> 
    );
    const learnMoreButton = getByText('Learn More');
    const navigateMock = jest.fn();

    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom') as unknown as any,
     useNavigate: () => navigateMock,
   }));

    // Act
    fireEvent.click(learnMoreButton);

    // Assert
    expect(navigateMock).toHaveBeenCalledWith('/cookies');
  });
  */
})