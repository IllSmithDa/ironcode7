import { describe, it, expect } from 'vitest';
import { render, } from '../../utils/test-utils';

import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

describe('Mock Login page', () => {
  // Renders a login form with email and password fields
  it('should render a login form with email and password fields', () => {
    // Arrange
    const { getByLabelText } = render(
    <BrowserRouter><Login /></BrowserRouter>
    );

    // Act
    const emailField = getByLabelText('Email:');
    const passwordField = getByLabelText('Password:');

    // Assert
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });
  
})