import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';

import { BrowserRouter } from 'react-router-dom';
import ConceptForm from './ConceptForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Mock Topics Tab', () => {
  it('should render the About page HTML document', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ConceptForm />
        </BrowserRouter>
      </QueryClientProvider>
    );
    // Assert that the title is rendered correctly
    const languageH = screen.getByText('Language:');
    expect(languageH).toBeInTheDocument();

    const conceptH = screen.getByText('Concept:');
    expect(conceptH).toBeInTheDocument();
  });
  
})