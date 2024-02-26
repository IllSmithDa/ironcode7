/* eslint-disable @typescript-eslint/no-unused-vars */

import Loader from '../../components/Loader/Loader';
import { ConceptItem, Language } from '../../types';
import { useEffect,useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faWrench } from '@fortawesome/free-solid-svg-icons/faWrench';
import EditConcept from './EditConcepts';
import DeleteConcept from './DeleteConcept';
import { axiosFetch } from '../../axios';
import UseAllLanguages from '../../hooks/LanguageHook';

export default function ConceptList() {
  const [conceptData, setConceptData] = useState<ConceptItem []>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>();
  const [languageDropdown, setLanguageDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string>();
  const [currentConcept, setCurrentConcept] = useState<ConceptItem>();
  const [modalId, setModalId] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const languages = UseAllLanguages();

  const url = '/api/concept/concept-only'
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true)
        const firstLanguage = (languages as Language[])[0];
        setSelectedLanguage(firstLanguage)
        const data = {
          language: firstLanguage.name
        }
        const res = await axiosFetch.post(`${url}`, data)
        if (res.status === 200) {
          console.log(res.data);
          setConceptData([...res.data.data])
        }
      } catch (err) {
        setIsError('Error: Data could not be retrieved. Contact Administrator for addtional support.');
      } finally {
        setIsLoading(false);
      }
    }
    fetch();
  }, [languages, url])

  useEffect(() => {
    if (editModalOpen || delModalOpen) {
      const body = document.getElementById('iron-code-body');
      if (body) body.classList.add('modal-open')
    } else {
      const body = document.getElementById('iron-code-body');
      if (body) body.classList.remove('modal-open')
    }
  }, [editModalOpen, delModalOpen])

  const fetchByLanguage = async (language: Language) => {
    try {
      setIsLoading(true);
      const data = {
        language: language.name
      }
      const res = await axiosFetch.post(`${url}`, data)
      if (res.status === 200) {
        console.log(res.data);
        setConceptData([...res.data.data]);
      }
      setIsLoading(false);
    } catch (err) {
      setIsError('Error: Data could not be retrieved. Contact Administrator for addtional support.');
    } finally {
      setIsLoading(false);
    }
  }

  const updateConceptList = (concept: ConceptItem) => {
    const updatedList = conceptData.map((entry) => {
      if (entry.id === concept.id) {
        return concept;
      } else {
        return entry
      }
    })
    setConceptData([...updatedList]);
  }

  const delConceptItem = (concept: ConceptItem) => {
    const updatedList = conceptData.filter((entry) =>  entry.id !== concept.id);
    setConceptData([...updatedList]);
  }

  const handleSelect = (language: Language) => {
    setLanguageDropdown(false);
    setSelectedLanguage(language);
    fetchByLanguage(language);
  }
  return (
    <section className={`
      p-[2rem] w-[800px] bg-[#393939] m-[auto] dark:text-[#FFF] text-[#FFF] relative
    `}>
      <h4 className="text-[2rem]">Select Language</h4>
      <button
        onClick={() => setLanguageDropdown(!languageDropdown)} 
        className={`
          w-[175px] h-[47px] p-[1rem] bg-[#2A2A2A] text-[1.6rem] align-right relative
          hover:bg-[#2E2E2E]
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
          {(languages as Language[]).map((entry) => (
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
      {
        isLoading === false?
        <>
          {
            conceptData?.map((data) => (
              <section 
                key={data.id}
                className={`
                  bg-[#272727] p-[2rem] my-[2rem]
                `}  
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() =>  {
                    setModalId(data.id);
                    setDelModalOpen(true);
                    setCurrentConcept(data)
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
                    setCurrentConcept(data);
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
              </section>
            ))
          } 
        </>:
        <Loader />
      }
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
