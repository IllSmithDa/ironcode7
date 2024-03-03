import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';

import { BrowserRouter } from 'react-router-dom';
import ConceptList from './ConceptList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Mock Topics Tab', () => {
  it('should render the About page HTML document', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ConceptList />
        </BrowserRouter>
      </QueryClientProvider>
    );
    const conceptList = screen.getByRole('list');
    expect(conceptList).toBeInTheDocument();
  
    const btn = screen.getByText('Select Language');
    expect(btn).toBeInTheDocument();
  });
  
})