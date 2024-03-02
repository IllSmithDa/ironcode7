import languageSelectImg from '../../assets/images/language_selection.webp';
import conceptSelectImg from '../../assets/images/concept_selection.webp';
import { Helmet } from 'react-helmet-async';
export default function About() {
  return (
    <section
      className={`
        pt-[50px] pb-[200px] fadeInLeft
      `}
    >
      <Helmet>
        <title>{`IronCodeMan | About`}</title>
        <meta name="description" content="Iron Code Man a reference for programmers. It is not a in depth tutorial on every programming language but instead is a resource on the specific syntax of everyday programming languages that helps users remember or familiarize similar concepts from different programming languages. Most programming languages have similar concepts such as variables, printing text, object oriented programming (classes) but the details are often slightly different such as lack of brackets, use of indentations, or simply capitzliaing S in String when declaring a vraiable to be a string type." />
        <meta property="og:title" content="IronCodeMan | About"/>
        <meta property="og:description" content="Iron Code Man a reference for programmers. It is not a in depth tutorial on every programming language but instead is a resource on the specific syntax of everyday programming languages that helps users remember or familiarize similar concepts from different programming languages. Most programming languages have similar concepts such as variables, printing text, object oriented programming (classes) but the details are often slightly different such as lack of brackets, use of indentations, or simply capitzliaing S in String when declaring a vraiable to be a string type. " />
        <meta property="og:url" content="https://ironcodeman.com/about"/>
      </Helmet>
      <section className={`
        w-[90%] mx-[auto] border-box p-[2.5rem] mt-[2.5rem] bg-[#E1E1E1]
         xl:w-[800px] 
         dark:bg-[#272727]
      `}>
        <h2>Purpose</h2>
        <p
          className={`
            mt-[1rem]
          `}
        >
          Iron Code Man a reference for programmers. It is not a in depth tutorial on every programming language but instead is a resource on the specific syntax of everyday programming languages that helps users remember or familiarize similar concepts from different programming languages. Most programming languages have similar concepts such as variables, printing text, object oriented programming (classes) but the details are often slightly different such as lack of brackets, use of indentations, or simply capitzliaing S in String when declaring a vraiable to be a string type. 
        </p>
      </section>
      <section className={`
        w-[90%] mx-[auto] p-[2.5rem] border-box mt-[2.5rem] bg-[#E1E1E1]
        xl:w-[800px] 
        dark:bg-[#272727]
      `}>
        <h3>Using Concept Topics Tab</h3>
        <img src={conceptSelectImg} alt='concept select example' />
        <p
          className={`
            mt-[1rem]
          `}
        >
          The reference can be read in two ways. One way is to select a topic on the left hand side of the app where you can see each concept done in various programming languages. It is important that make sure to consult documentation for further analysis and clarification on the distinctions of a concept if the user is learning the language for the first time or is not familiar with the parituclar distinctions of a programming language.
        </p>
      </section>
      <section className={`
        w-[90%] mx-[auto] p-[2.5rem] border-box mt-[2.5rem] bg-[#E1E1E1]
        xl:w-[800px] 
        dark:bg-[#272727]
      `}>
        <h3>Using Language Dropdown</h3>
        <img src={languageSelectImg} alt='language select example' />
        <p
          className={`
            mt-[1rem]
          `}
        >
          The Top right dropdown will allow users to select a programmining language and select it to see all the different concepts on one page for that particular programming langauge. This view is good if you want to focus on just one particular language while the concept view allows you to compare syntax between various programming languages 
        </p>
      </section>
      <section className={`
        w-[90%] mx-[auto] pt-[2.5rem] p-[2.5rem] border-box mt-[2.5rem] bg-[#E1E1E1]
        xl:w-[800px]
        dark:bg-[#272727]
      `}>
        <h3>Questions?</h3>
        <p
          className={`
            mt-[1rem]
          `}
        >If you have any questions about hwo the app works, suggestions or comments about how to make this app even better, please contact us at <a 
        className={`
          text-[7px] sm:text-[1.2rem] md:text-[1.5rem]
        `}
        href="mailto:contact@ironcodeman.com">contact@ironcodeman.com</a>.</p>
      </section>
    </section>
  )
}
