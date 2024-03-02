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
import Ads from '../../components/Ads/Ads';
import Ads2 from '../../components/Ads/Ads2'
// import MobileAds from '../../components/Ads/MobileAds';
import MobileAds2 from '../../components/Ads/MobileAds2';
import MobileAds1 from '../../components/Ads/MobileAds1';

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
    enabled: !!topicId
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
    enabled: !!topicId
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
    <>
      {
        data.checked ? 
        <article
          key={data.language}
          className={`
            w-[100%]  bg-[#EAEAEA] p-[1.5rem] mt-[2rem] h-[max]
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
      </>
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
      <section
        className='xl:flex justify-center py-[2rem] w-[100%] hidden'
      >
        <Ads />
      </section>
      <section
        className='flex justify-center w-[100%] mt-[2rem] xl:hidden'
      >
        <MobileAds1 />
      </section>
      <article className={
        `my-[2rem]`
      }>
        <h3>{topic?.name}</h3>
        <p className='fadeInLeft'>{topic?.description}</p>
      </article>
      {
        loaded ?
        <section className='my-[2rem]'>
          <LanguageSelect languages={conceptsAndLanguages} updateLanguages={updateLanguages}/>
        </section>:
         <Loader />
      }
      <h4
        className={`
          mt-[2rem]
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
          <section
             className='flex justify-center w-[100%] mt-[2rem] lg:hidden'
           >
             <MobileAds2 />
           </section>
           <section
             className='lg:flex justify-center py-[2rem] w-[100%] hidden'
           >
             <Ads2 />
           </section>
        </section>:
        <Loader />
      }
    </section>
  )
}
