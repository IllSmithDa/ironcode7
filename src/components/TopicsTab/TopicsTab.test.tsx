import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';

import TopicsTab from './TopicsTab';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient({
  defaultOptions: {queries: {
    staleTime: (1000 * 60) * 5
  }}
});

describe('Mock Topics Tab', () => {
  it('should render a section with id \'topic-tab\' and data-testid \'topics-tab\'', () => {
    render(
      <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
        <TopicsTab />
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
    );
    const section = screen.getByTestId('topics-tab');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'topic-tab');
  });
  
})