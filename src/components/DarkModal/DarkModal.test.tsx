import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';
import DarkModal from './DarkModal';

describe('Mock Modal Component', () => {
  it('should render children when isOpen is true', () => {
    // Arrange
    const children = <div>Test Children</div>;
    const isOpen = true;

    // Act
    render(<DarkModal isOpen={isOpen}>{children}</DarkModal>);

    // Assert
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });
  it('should not render children when isOpen is undefined', () => {
    // Arrange
    const children = <div>Test Children</div>;
    const isOpen = false;

    // Act
    render(<DarkModal isOpen={isOpen}>{children}</DarkModal>);

    // Assert
    expect(screen.queryByText('Test Children')).not.toBeInTheDocument();
  });
})