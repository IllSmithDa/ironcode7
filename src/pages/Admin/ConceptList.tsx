/* eslint-disable @typescript-eslint/no-unused-vars */

import Loader from '../../components/Loader/Loader';
import { ConceptItem, Language } from '../../types';
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faWrench } from '@fortawesome/free-solid-svg-icons/faWrench';
import EditConcept from './EditConcepts';
import DeleteConcept from './DeleteConcept';
import { axiosFetch } from '../../axios';
import UseAllLanguages from '../../hooks/LanguageHook';
import { useQuery } from '@tanstack/react-query';
import NoMatch from '../NoMatch/NoMatch';

export default function ConceptList() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>();
  const [languageDropdown, setLanguageDropdown] = useState(false)
  const [modalId, setModalId] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const languages = UseAllLanguages();
  const url = '/api/concept/concept-only'
 
  useEffect(() => {
    if(languages?.length) {
      setSelectedLanguage(languages[0])
    }
  }, [languages])

  const conceptsQuery = useQuery({
    queryKey: ['concepts-only', selectedLanguage],
    queryFn: async () => {
      const data = {
        language: selectedLanguage ? selectedLanguage.name: languages[0].name
      }
      const res = await axiosFetch.post(url, data)
      return res.data.data;
    },
    enabled: !!selectedLanguage
  })
  
  const conceptData:ConceptItem[] = conceptsQuery.data;


  const updateConceptList = (concept: ConceptItem) => {
    conceptData.map((entry) => {
      if (entry.id === concept.id) {
        return concept;
      } else {
        return entry
      }
    })
  }

  const delConceptItem = (concept: ConceptItem) => {
    conceptData.filter((entry) =>  entry.id !== concept.id);
  
  }

  const handleSelect = (language: Language) => {
    setLanguageDropdown(false);
    setSelectedLanguage(language);
  }

  return (
    <section className={`
      p-[2rem] w-[800px] bg-[#2B2B2B] m-[auto] dark:text-[#FFF] text-[#FFF] relative
    `}>
      <h4 className="text-[2rem]">Select Language</h4>
      <button
        onClick={() => setLanguageDropdown(!languageDropdown)} 
        className={`
          w-[175px] h-[47px] p-[1rem] bg-[#3C3C3C] text-[1.6rem] align-right relative
          hover:bg-[#474747]
          dark:text-[#FFF] text-[#FFF] 
        `}
      >
        {selectedLanguage?.name} {languageDropdown ? <>&#11205;</> : <>&#11206;</>}
      </button>
      {
        languageDropdown ?
        <ul className={`
          absolute z-50 bg-[#333]
        `}>
          {(languages as Language[])?.map((entry) => (
            <li key={entry.id}>
              <button
                onClick={() => handleSelect(entry)}
                className={`
                  bg-[#222] text-[1.8rem] p-[1rem] w-[175px] border-box text-white
                  hover:bg-[#333]
                `}
              >
                {entry.name}
              </button>
            </li>
          ))}
        </ul>:
        <></>
      }
      {conceptsQuery.isLoading ?
        <Loader />:<></>
      }
      {conceptsQuery.isError ?
        <NoMatch msg="Error: Data fetching failed. Data does not exists or server has gone offline. Please try again later." />:<></>
      }
      <ul>
      {
        conceptData?.map((data) => (
          <li 
            key={data.id}
            className={`
              bg-[#222] p-[2rem] my-[2rem]
            `}  
          >
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() =>  {
                setModalId(data.id);
                setDelModalOpen(true);
              }}
              className={`
                float-right text-[2.5rem] hover:text-[#DDD] cursor-pointer 
              `}
            />
            <FontAwesomeIcon
              icon={faWrench}
              onClick={() =>  {
                setModalId(data.id);
                setEditModalOpen(true);
              }}
              className={`
                float-right text-[2.5rem] hover:text-[#DDD] mr-[2rem] cursor-pointer
              `}
            />
            <h4>
              {data.concept_name}
            </h4>
            <pre style={{ fontSize: '2rem'}}>{data.text}</pre>
            {
              editModalOpen ? 
              <EditConcept 
                isModalOpen={data.id === modalId}
                setEditModal={setEditModalOpen}
                updateConcepts={updateConceptList}
                currentConcept={data}
              />:
              <></>
            }
            {
              delModalOpen ? 
              <DeleteConcept
                isModalOpen={data.id === modalId}
                selectedConcept={data}
                setModalState={setDelModalOpen}
                delConceptItem={delConceptItem}
              />:
              <></>
            }
          </li>
        ))
      }
      </ul>
      {
        languageDropdown ? 
        <div 
          onClick={() => {
            setLanguageDropdown(false);
          }}
          className={`
            fixed z-[25] left-0 top-0 w-[100%] h-[100%] justify-center flex-col overflow-auto
          `}
          ></div>:
        <></>
      }
      {
        delModalOpen || editModalOpen ? 
        <div
          onClick={() => {
            setDelModalOpen(false);
            setEditModalOpen(false);
          }}
          className={`
            fixed z-[100] left-0 top-0 w-[100%] h-[100%] justify-center flex-col overflow-auto bg-[#000] opacity-70
          `}
        >
        </div>:
        <></>
      }
    </section>
  )
}
