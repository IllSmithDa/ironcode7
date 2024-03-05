### Ironcode 7 ###



# Tech - React, React Query (Tanstack), TypeScript, Axios, Tailwind CSS, Vitest, Cypress (separate project), formik (forms), React Router Dom, yup (form validation), react-helmet-async (meta tags)



# Tailwind Install

1. npm install -D tailwindcss

2. npx tailwindcss init

  a. creates tailwind config file

3. Make sure tailwind config includes ts and tsx file support 

  a.  content: ["./src/**/*.{js,jsx,ts,tsx}"],

4. As this is a Vite project, update Vite config to include tailwindcss

  a. e.g

  import tailwindcss from "tailwindcss";

  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },

5. Include the tailwind dependencies into the highest level css file (index.css)

  a. e.g

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

6. Test tailwind by adding classes to elements 

  a. e.g removes the bullet points on a tags

  <ul>
    <li className='list-none'>
      <a href="/"> Home</a>
    </li>
    <li className='list-none'>
      <a href="/about">About</a>
    </li>
  </ul>

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
