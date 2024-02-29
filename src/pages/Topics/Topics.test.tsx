import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';

import LanguageSelect from './LanguageSelect';

describe('Mock language select component', () => {
  it('should handle missing languages prop', () => {
    // Arrange
    const updateLanguages = () => { console.log('test')};

    // Act
    render(<LanguageSelect updateLanguages={updateLanguages} />);

    // Assert
    const languageElements = screen.queryAllByRole('listitem');
    expect(languageElements).toHaveLength(0);
  });
  
})