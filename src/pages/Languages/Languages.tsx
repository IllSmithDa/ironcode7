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
  // const [concepts, setConcepts] = useState<ConceptItem []>([]);
  // const [darkMode, setDarkMode] = useState<boolean>();
  // const [languageData, setLanguageData] = useState<Language>();
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
      console.log(data);
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
              className='card'
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
    <section className={`language-items-container ${darkMode ? 'dark': ''}`}>
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
        <section className='dropdown-cont'>
            <button type='button' onClick={() => SetCategoryDrop(!categoryDrop)} className={`lang-navbar-dropdown list-right menu-tabs ${darkMode ? 'dark': ''}`}>
              {title} {categoryDrop ? <>▲</> : <>▼</>}
          </button>
          {
            categoryDrop ?
            <section className={`category-select-dropdown ${darkMode ? 'dark': ''}`}>
              <button
                onClick={() => handleTabChange('basic', 'Basics') }
                className='active-tab menu-tabs'
              >
                Basics
              </button>
              <button
                className={`menu-tabs ${darkMode ? 'dark': ''}`}
                onClick={() => handleTabChange('data', 'Data Structures') }
              >
                Data Structures
              </button>
              <button
                className={`menu-tabs ${darkMode ? 'dark': ''}`}
                onClick={() => handleTabChange('iterables', 'Iterables') }
              >
                Iterables
              </button>
              <button
                onClick={() => handleTabChange('class', 'Classes') }
                className={`menu-tabs ${darkMode ? 'dark': ''}`}
              >
                Classes
              </button>
              <button
                onClick={() => handleTabChange('regex', 'Regex') }
                className={`menu-tabs ${darkMode ? 'dark': ''}`}
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
          className='silent-modal'
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
