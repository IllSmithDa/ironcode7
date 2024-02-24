import { useEffect, useState } from 'react';
import { ActiveConceptItem, ActiveLanguages, ConceptItem, ConceptTopic, Language } from '../../types';
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

  const TopicDataQuery = useQuery({
    queryKey:["topicData", topicId],
    queryFn: async() => {
      const topicRes = await axiosFetch.get(`/api/concept/topic-object/${topicId}`);
      const result:ConceptTopic = topicRes.data.data;

      return result;
    }
  })
  
  const topic: ConceptTopic = TopicDataQuery.data as ConceptTopic;
  
  const ConceptItemsQuery = useQuery({
    queryKey: ["activeConcepts", topicId],
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
        <article key={data.language}
          className={`
            w-[100%]  bg-[#F0F0F0] p-[1.5rem]
            lg:w-[auto]
            dark:bg-[#292929]
          `}
        >
          <h4>{data.language}</h4>
          <pre
            id={`${data.id}_code`}
          >
            {data.text}
          </pre>
        </article>:
        <></>
      }
    </>
  ))

  return (
    <section
      className={`
        px-[2rem]
      `}
    >
      <article className={
        `my-[5rem]`
      }>
        <h3>{topic?.name}</h3>
        <p>{topic?.description}</p>
      </article>
      <LanguageSelect languages={conceptsAndLanguages} updateLanguages={updateLanguages}/>
      <h4
        className={`
          mt-[5rem]
        `}
      >Examples</h4>
      <section
        className={`
          pb-[20rem] flex flex-wrap gap-[2rem] 
        `}
      >
        {renderData}
      </section>
    </section>
  )
}
