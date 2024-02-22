'use client';
import { ActiveConceptItem, ActiveLanguages, ConceptItem, Language } from '../../types';
import LanguageSelect from './LanguageSelect';
import { axiosFetch } from '../../axios';
import { useParams } from 'react-router-dom';
import UseAllLanguages from '../../hooks/LanguageHook';
import { useQuery } from '@tanstack/react-query';
export default function Topic() {
  const { topicId } = useParams<"topicId">();
  // const [conceptsAndLanguages, setConceptsAndLangauges] = useState<ActiveConceptItem[]>();
  const languages:Language[] = UseAllLanguages();

  const ActiveConceptQuery = useQuery({
    queryKey: ["activeConcepts"],
    queryFn: async () => {
      const conceptLink = `/api/concept/topic-id/${topicId}`;
      const conceptRes = await axiosFetch.get(conceptLink);
      const conceptItems: ConceptItem[] = conceptRes.data.data;
      let activeLanguages: ActiveLanguages = {};
      if (localStorage.getItem('iron_code_languages') === null) {
        languages.forEach((entry) => {
          activeLanguages[entry.name] = true;
        })
        localStorage.setItem('iron_code_languages', JSON.stringify(activeLanguages))
      } else {
        activeLanguages = JSON.parse(localStorage.getItem('iron_code_languages') as string);
      }
      
      const result:ActiveConceptItem[] = conceptItems.map((entry) => {
        return {
          ...entry,
          checked: activeLanguages[entry.language],
        }
      });
      return result;
    },
    enabled: !!languages
  })

  const conceptsAndLanguages = ActiveConceptQuery.data;

  // useEffect(() => {
  //   const setupData = async () => {
  //     const conceptLink = `/api/concept/topic-id/${topicId}`;
  //     const conceptRes = await axiosFetch.get(conceptLink);
  //     
  //     const languageLink = `/api/language/all-languages`;
  //     const languageRes = await axiosFetch.get(languageLink);
  //   
  //     
  //     const conceptItems: ConceptItem[] = conceptRes.data.data;
  //     const languages:Language[] = languageRes.data.data;
  //   
  //     // get active languages from 
  //     let activeLanguages: ActiveLanguages = {};
  //     if (localStorage.getItem('iron_code_languages') === null) {
  //       (languages as Language []).forEach((entry) => {
  //         activeLanguages[entry.name] = true;
  //       })
  //       localStorage.setItem('iron_code_languages', JSON.stringify(activeLanguages))
  //     } else {
  //       activeLanguages = JSON.parse(localStorage.getItem('iron_code_languages') as string);
  //     }
  //     
  //     const result:ActiveConceptItem[] = conceptItems.map((entry) => {
  //       return {
  //         ...entry,
  //         checked: activeLanguages[entry.language],
  //       }
  //     });
  //     setConceptsAndLangauges(result);
  //   }
  //   if (topicId) {
  //     setupData();
  //   }
  // }, [topicId])


  const updateLanguages = (updatedData: ActiveConceptItem[]) => {
    // setConceptsAndLangauges([...updatedData])
    console.log(updatedData);
  }

  const renderData = (conceptsAndLanguages as ActiveConceptItem[])?.map((data) => (
    <>
      {
        data.checked ? 
        <article key={data.language} className='card'>
        <h4>{data.language}</h4>
        <pre id={`${data.id}_code`} className='code'>{data.text}</pre>
      </article>:
      <></>
      }
    </>
  ))

  return (
    <section>
      <section>
        <LanguageSelect languages={conceptsAndLanguages} updateLanguages={updateLanguages}/>:
      </section>
      <section>
        {renderData}
      </section>
    </section>
  )
}
