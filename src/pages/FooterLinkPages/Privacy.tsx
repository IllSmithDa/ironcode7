import { Helmet } from "react-helmet-async";


export default function Privacy() {
  return (
    <section
      className={`
        pt-[50px] pb-[200px] min-h-[100vh] fadeInLeft
      `}
    >
      <Helmet>
        <title>{`IronCodeMan | Privacy`}</title>
        <meta name="description" content="Iron Code Man - Privacy Policy. This Privacy Policy governs the manner in which Iron Code Man collects, uses, maintains, and discloses information collected from users (each, a &ldquo;User&ldquo;) of the Iron Code Man website (&ldquo;the Website&ldquo;).
        " />
        <meta property="og:title" content="IronCodeMan | Privacy"/>
        <meta property="og:description" content="Iron Code Man - Privacy Policy. This Privacy Policy governs the manner in which Iron Code Man collects, uses, maintains, and discloses information collected from users (each, a &ldquo;User&ldquo;) of the Iron Code Man website (&ldquo;the Website&ldquo;).
        "  />
        <meta property="og:url" content="https://ironcodeman.com/privacy"/>
      </Helmet>
      <section className={`
        w-[90%] px-[2.5rem] pt-[1px] pb-[2.5rem] mx-[auto] border-box bg-[#E1E1E1]
        xl:w-[800px]
        dark:bg-[#272727]
      `} >
        <h3
          className={`
            mt-[2rem]
          `}
        >
          Iron Code Man - Privacy Policy
        </h3>
        <p>This Privacy Policy governs the manner in which Iron Code Man collects, uses, maintains, and discloses information collected from users (each, a &ldquo;User&ldquo;) of the Iron Code Man website (&ldquo;the Website&ldquo;).</p>
  
        <h4
          className={`
            mt-[4rem]
          `}
        >1. Personal Identification Information:</h4>
        <p>We may collect personal identification information from Users in various ways, including but not limited to when Users visit our site, register on the site, subscribe to the newsletter, and in connection with other activities, services, features, or resources we make available on our Website.</p>
  
        <h4
          className={`
            mt-[4rem]
          `}
        >2. Non-personal Identification Information:</h4>
        <p>We may collect non-personal identification information about Users whenever they interact with our Website. Non-personal identification information may include the browser name, the type of computer, and technical information about Users&apos; means of connection to our Website, such as the operating system and the Internet service providers utilized.</p>
  
        <h4
          className={`
            mt-[4rem]
          `}
        >3. Web Browser Cookies:</h4>
        <p>Our Website may use &ldquo;cookies&ldquo; to enhance User experience. Users may choose to set their web browser to refuse cookies or to alert you when cookies are being sent. If they do so, note that some parts of the Website may not function properly.</p>
  
        <h4
          className={`
            mt-[4rem]
          `}
        >4. Changes to this Privacy Policy:</h4>
        <p>Iron Code Man has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.</p>
  
        <p>By using the Iron Code Man website, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Website.</p>
  
        <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at <a 
        className={`
          text-[7px] sm:text-[1.2rem] md:text-[1.5rem]
        `}
        href="mailto:contact@ironcodeman.com">contact@ironcodeman.com</a>.</p>
      </section>
    </section>
  )
} 
