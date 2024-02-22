import { useEffect, useState } from 'react';
import { ActiveConceptItem, ActiveLanguages, ConceptItem, Language } from '../../types';
import LanguageSelect from './LanguageSelect';
import { axiosFetch } from '../../axios';
import { useParams } from 'react-router-dom';
import UseAllLanguages from '../../hooks/LanguageHook';
import { useQuery } from '@tanstack/react-query';
import { parseConcepts } from '../../helper/parseData';

export default function Topic() {
  const { topicId } = useParams<"topicId">();
  const [conceptsAndLanguages, setConceptsAndLangauges] = useState<ActiveConceptItem[]>();
  const languages:Language[] = UseAllLanguages();

  const ConceptItemsQuery = useQuery({
    queryKey: ["activeConcepts"],
    queryFn: async () => {
      const conceptLink = `/api/concept/topic-id/${topicId}`;
      const conceptRes = await axiosFetch.get(conceptLink);
      const result: ConceptItem[] = conceptRes.data.data;

      return result;
    },
    enabled: !!languages
  })

  const conceptItems: ConceptItem[] = ConceptItemsQuery.data as ConceptItem[];

  useEffect(() => {
    if(conceptItems?.length) {
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
      setConceptsAndLangauges(result);
    }
  }, [conceptItems, languages])

  useEffect(() => {
    if (conceptsAndLanguages?.length) {
      for(let i = 0; i < conceptsAndLanguages.length; i += 1) {
        parseConcepts(conceptsAndLanguages[i].text, `${conceptsAndLanguages[i].id}_code`);
      }
    }

  }, [conceptsAndLanguages])


  const updateLanguages = (updatedData: ActiveConceptItem[]) => {
    setConceptsAndLangauges([...updatedData])

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
