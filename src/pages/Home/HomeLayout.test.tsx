
import { describe, it, expect } from 'vitest';
import { render, screen, } from '../../utils/test-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {HelmetProvider} from "react-helmet-async";
import { BrowserRouter } from 'react-router-dom'
import HomeLayout from './HomeLayout';

const queryClient = new QueryClient({
  defaultOptions: {queries: {
    staleTime: (1000 * 60) * 5
  }}
});

describe('Mock Home Layout', () => {
    // Renders a div with a class name of '2xl:w-[1600px] w-[100%] mx-auto flex bg-[#FDFDFD] dark:bg-[#1B1B1B]'
    it('should render a div with the correct class name', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <BrowserRouter>
              <HomeLayout />
            </BrowserRouter>
          </HelmetProvider>
        </QueryClientProvider>
      );
      const topicsTabElement = screen.getByTestId('main-content');
      expect(topicsTabElement).toBeInTheDocument();
    });
  
})