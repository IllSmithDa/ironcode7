# Testing libraries installed

  1. vitest

  2. @testing-library/jest-dom

  3. @testing-library/react

  4. @testing-library/user-event

  5. jsdom

  6. @types/jest
  
# Optional Test coverage 

  1. @vitest/coverage-v8

  2. @vitest/ui

# Make sure to include all content to make test work

  i.e
  render(
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <HomeLayout />
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );

1. Add test/setup.ts file and import jsdom

  a. import '@testing-library/jest-dom'

# Cypress e2e 

# Install Cypress and startup

  1. npm i --save -dev cypress

  2. use command 'npx cypress open'

  3. Follow prompts on the automatically opened cypress menu

# Tips 

  1. Run Cypress commands as an administrator

    a. https://stackoverflow.com/questions/74723664/cypress-test-runner-intermittent-econnrefused-127-0-0-14200
