import { axiosFetch } from '../../axios';
import Loader from '../../components/Loader/Loader';
import { ConceptItem, Language } from '../../types';
import { useEffect, useState } from 'react';
import { parseConcepts } from '../../helper/parseData';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function Languages() {
  // const [isLoading, setIsLoading] = useState(true);
  const [category, SetCategory] = useState("basic");
  const [title, setTitle] = useState("Basics");
  const [categoryDrop, SetCategoryDrop] = useState(false);
  const { languageId } = useParams<"languageId">();
  const languageLink = `/api/language/by-id/${languageId}`
  const link = `/api/concept/by-language`;
  const darkMode = false;
  // const {isDark} = useTheme();
  

  const languageQuery = useQuery({
    queryKey: ['language-item', languageId],
    queryFn: async () => {
      const languageRes = await axiosFetch.get(languageLink)
      return languageRes.data.data;
    }
  })

  const languageData:Language = languageQuery?.data;

  const conceptItemQuery = useQuery({
    queryKey: ['conceptItem', languageData?.name],
    queryFn: async () => {
      const res = await axiosFetch.post(link, { language: languageData?.name})
      const data: ConceptItem[] = res.data.data;
      return data;
    },
    enabled: !!languageData,
  })

  const concepts: ConceptItem[] = (conceptItemQuery?.data as ConceptItem[]);

  useEffect(() => {
    if (concepts?.length) {
      for(let i = 0; i < concepts.length; i += 1) {
        parseConcepts(concepts[i].text, `${concepts[i].id}_code`);
      }
    }

  }, [concepts, categoryDrop])

  const renderData = () => {
    return (
      <>
        {
          concepts?.filter(topic => topic.category === category).map((data) => (
            <li
              className={`
                w-[[200]%] bg-[#F1F1F1] p-[2rem] my-[2rem] 
                dark:bg-[#272727]
              `}
              key={data.id}
            >
              <h4>{data.concept_name}</h4>
              <pre id={`${data.id}_code`} className='code'>{data.text}</pre>
            </li>
          ))
        }
      </>
    )
  }
  const handleTabChange = (topic: string, categoryTitle: string) => {
    SetCategory(topic);
    SetCategoryDrop(!categoryDrop);
    setTitle(categoryTitle)
  }
  return (
    <section className={`
      px-[2rem] my-[5rem] mb-[20rem]
    `}>
      {/* <SlidingBackground /> */}
      <h3>Concepts for {languageData?.name}</h3>
      <p style={{ margin: "2rem 0"}}>
        {languageData?.description}
      </p>
      {
        !languageData || !concepts?.length?

        <section className={`loader-container  ${darkMode ? 'dark': ''}`}>
          <Loader />
        </section>:
        <ul>
        <section className={`
          relative flex
        `}>
            <button
              type='button'
              onClick={() => SetCategoryDrop(!categoryDrop)}
              className={`
                w-[200px] h-[47px] bg-[#DDD] text-[1.5rem]
                hover:bg-[#E9E9E9]
                dark:bg-[#272727] dark:hover:bg-[#414141]
              `}
            >
              {title} {categoryDrop ? <>▲</> : <>▼</>}
          </button>
          {
            categoryDrop ?
            <section className={`
              flex flex-col absolute top-[47px] left-0 gap-0 bg-[#EFEFEF] 
            `}>
              <button
                onClick={() => handleTabChange('basic', 'Basics') }
                className={`
                  w-[200px] text-[1.5rem] p-[1rem] bg-[#E8E8E8] relative z-[200]
                  hover:bg-[#F2F2F2]
                  dark:bg-[#272727] dark:hover:bg-[#414141]
                `}
              >
                Basics
              </button>
              <button
                onClick={() => handleTabChange('data', 'Data Structures') }
                className={`
                  w-[200px] text-[1.5rem] p-[1rem] bg-[#E8E8E8] relative z-[200]
                  hover:bg-[#F2F2F2]
                  dark:bg-[#272727] dark:hover:bg-[#414141]
                `}
              >
                Data Structures
              </button>
              <button
                onClick={() => handleTabChange('iterables', 'Iterables') }
                className={`
                  w-[200px] text-[1.5rem] p-[1rem] bg-[#E8E8E8] relative z-[200]
                  hover:bg-[#F2F2F2]
                  dark:bg-[#272727] dark:hover:bg-[#414141]
                `}
              >
                Iterables
              </button>
              <button
                onClick={() => handleTabChange('class', 'Classes') }
                className={`
                  w-[200px] text-[1.5rem] p-[1rem] bg-[#E8E8E8] relative z-[200]
                  hover:bg-[#F2F2F2]
                  dark:bg-[#272727] dark:hover:bg-[#414141]
                `}
              >
                Classes
              </button>
              <button
                onClick={() => handleTabChange('regex', 'Regex') }
                className={`
                  w-[200px] text-[1.5rem] p-[1rem] bg-[#E8E8E8] relative z-[200]
                  hover:bg-[#F2F2F2]
                  dark:bg-[#272727] dark:hover:bg-[#414141]
                `}
              >
                Regex
              </button>
                </section>:
                <></>
              }
            </section>
          <section>
            {renderData()}
          </section>
        </ul>
      }
      {
        categoryDrop ? 
        <div
          className={`
            fixed z-50 left-0 top-0 w-[100%] h-[100%] justify-center flex-col overflow-auto
          `}
          onClick={() => {
            SetCategoryDrop(false); 
          }}
        >
        </div>:
        <></>
      }
    </section>
  )
}
