import languageSelectImg from '../../assets/images/language_selection.webp';
import conceptSelectImg from '../../assets/images/concept_selection.webp';
export default function About() {
  return (
    <>
     <section className={`about-container`}>
      <h2>Purpose</h2>
      <p>
        Iron Code Man a reference for programmers. It is not a in depth tutorial on every programming language but instead is a resource on the specific syntax of everyday programming languages that helps users remember or familiarize similar concepts from different programming languages. Most programming languages have similar concepts such as variables, printing text, object oriented programming (classes) but the details are often slightly different such as lack of brackets, use of indentations, or simply capitzliaing S in String when declaring a vraiable to be a string type. 
      </p>
    </section>
    <section className={`about-container`}>
      <h3>Using Concept Topics Tab</h3>
      <img src={conceptSelectImg} alt='concept select example' />
      <p>
        The reference can be read in two ways. One way is to select a topic on the left hand side of the app where you can see each concept done in various programming languages. It is important that make sure to consult documentation for further analysis and clarification on the distinctions of a concept if the user is learning the language for the first time or is not familiar with the parituclar distinctions of a programming language.
      </p>
    </section>
    <section className={`about-container`}>
      <h3>Using Language Dropdown</h3>
      <img src={languageSelectImg} alt='language select example' />
      <p>
        The Top right dropdown will allow users to select a programmining language and select it to see all the different concepts on one page for that particular programming langauge. This view is good if you want to focus on just one particular language while the concept view allows you to compare syntax between various programming languages 
      </p>
    </section>
    <section className={`about-container bottom-section`}>
      <h3>Questions?</h3>
      <p>If you have any questions about hwo the app works, suggestions or comments about how to make this app even better, please contact us at <a href="mailto:contact@ironcodeman.com">contact@ironcodeman.com</a>.</p>
    </section>
    </>
  )
}
