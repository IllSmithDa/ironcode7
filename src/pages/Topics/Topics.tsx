import { useEffect, useState } from 'react';
import { ActiveConceptItem, ActiveLanguages, ConceptItem, ConceptTopic, Language } from '../../types';
import LanguageSelect from './LanguageSelect';
import { axiosFetch } from '../../axios';
import { useParams } from 'react-router-dom';
import UseAllLanguages from '../../hooks/LanguageHook';
import { useQuery } from '@tanstack/react-query';
import { parseConcepts } from '../../helper/parseData';
import Loader from '../../components/Loader/Loader';
import { Helmet } from 'react-helmet-async';
import NoMatch from '../NoMatch/NoMatch';

export default function Topic() {
  const [loaded, setLoaded] = useState(false);
  const { topicId } = useParams<"topicId">();
  const [conceptsAndLanguages, setConceptsAndLangauges] = useState<ActiveConceptItem[]>();
  const languages:Language[] = UseAllLanguages();

  const TopicDataQuery = useQuery({
    queryKey:["topicData", topicId],
    queryFn: async() => {
      const topicRes = await axiosFetch.get(`/api/concept/topic-object/${topicId}`);
      const result:ConceptTopic = topicRes.data.data;
      return result;
    },
  })

  const topic: ConceptTopic = TopicDataQuery.data as ConceptTopic;
  
  const ConceptItemsQuery = useQuery({
    queryKey: ["activeConcepts", topicId],
    queryFn: async () => {
      const conceptLink = `/api/concept/topic-id/${topicId}`;
      const conceptRes = await axiosFetch.get(conceptLink);
      const result: ConceptItem[] = conceptRes.data.data;

      return result;
    }
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
      setTimeout(() => setLoaded(true), 200);
    }
  }, [conceptItems, languages])

  useEffect(() => {
    if (conceptsAndLanguages?.length && loaded) {
      for(let i = 0; i < conceptsAndLanguages.length; i += 1) {
        parseConcepts(conceptsAndLanguages[i].text, `${conceptsAndLanguages[i].id}_code`);
      }
    }

  }, [conceptsAndLanguages, loaded])


  const updateLanguages = (updatedData: ActiveConceptItem[]) => {
    setConceptsAndLangauges([...updatedData])

  }

  const renderData = (conceptsAndLanguages as ActiveConceptItem[])?.map((data) => (
    <section
      key={data.language}
    >
      {
        data.checked ? 
        <article
          className={`
            w-[100%]  bg-[#EAEAEA] p-[1.5rem] mt-[2rem] h-[100%]
            lg:w-[auto] xl:mt-0
            dark:bg-[#272727]
            fadeInLeft
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
    </section>
  ))

  if (TopicDataQuery.isError || ConceptItemsQuery.isError) {
    return (
      <NoMatch />
    )
  }

  return (
    <section
      className={`
        px-[2rem]
      `}
    >
      <Helmet>
        <title>{`IronCodeMan | ${topic?.name}`}</title>
        <meta name="description" content={topic?.description} />
      </Helmet>
      <article className={
        `my-[5rem]`
      }>
        <h3>{topic?.name}</h3>
        <p className='fadeInLeft'>{topic?.description}</p>
      </article>
      {
        loaded ?
        <LanguageSelect languages={conceptsAndLanguages} updateLanguages={updateLanguages}/>:
         <Loader />
      }
      <h4
        className={`
          mt-[5rem]
        `}
      >Examples</h4>
      {
        loaded?
        <section
          key="language-listing"
          className={`
            pb-[20rem] block flex-wrap gap-[2rem]
            xl:flex
          `}
        >
          {renderData}
        </section>:
        <Loader />
      }
    </section>
  )
}
