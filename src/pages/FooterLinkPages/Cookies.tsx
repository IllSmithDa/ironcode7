import { Helmet } from "react-helmet";

export default function Cookies() {
  
  return (
    <section
      className={`
        pt-[50px] pb-[200px] min-h-[100vh]
      `}
    >
      <Helmet>
        <title>{`IronCodeMan | Cookiess`}</title>
      </Helmet>
      <section className={`
        w-[90%] px-[2.5rem] pt-[1px] pb-[2.5rem] mx-[auto] border-box bg-[#E1E1E1]
        xl:w-[800px]
        dark:bg-[#272727]
      `}>
        <h3
          className={`
            mt-[4rem]
          `}
        >Iron Code Man - Cookie Usage</h3>
        <p>This website (&ldquo;Iron Code Man&ldquo;) uses cookies. By using this website, you consent to the use of cookies in accordance with this Cookie Notice.</p>
  
        <h3
          className={`
            mt-[4rem]
          `}
        >1. What are Cookies?</h3>
        <p>
          Cookies are small text files that are stored on your computer or mobile device when you visit a website. They help the website remember your actions and preferences over a period of time, so you don’t have to keep re-entering them whenever you come back to the site or browse from one page to another. </p>
        <p>
          For example, the first time a user visits a site, they may choose a username which is stored in the cookie, and then provide data such as password, name, address, preferred font size, page layout, etc. This information would all be stored on the database using the username as a key. Subsequently when the site is revisited the server will read the cookie to find the username, and then retrieve all the user’s information from the database without it having to be re-entered.</p>
        <h3
          className={`
            mt-[4rem]
          `}
        >2. How We May Use Cookies:</h3>
        <h4>We use cookies for the following purposes:</h4>
        <ul>
          <li
            className={`
              mt-[2rem]
            `}
          ><p>1. To enable certain functions of the website.</p></li>
          <li
            className={`
              mt-[2rem]
            `}
          ><p>2. To provide analytics and help us understand how visitors interact with our website.</p></li>
          <li
            className={`
              mt-[2rem]
            `}
          ><p>3. To personalize your experience by remembering your preferences.</p></li>
          <li
            className={`
              mt-[2rem]
            `}
          ><p>4. Help website visitors complete tasks, such as filling out forms (autocomplete, etc.)</p></li>
          <li
            className={`
              mt-[2rem]
            `}
          ><p>5. Recognize the visitor&apos;s device</p></li>
        </ul>
        <h3
          className={`
            mt-[4rem]
          `}
        >3. Disabling Cookies:</h3>
        <p>
          You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer, and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit a site, and some services and functionalities may not work.
        </p>
      </section>
    </section>
  )
}
