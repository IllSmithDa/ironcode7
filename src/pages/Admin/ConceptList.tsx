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
    <section className='form-container edit-concepts-cont'>
      <h4>Select Language</h4>
      <button
        onClick={() => setLanguageDropdown(!languageDropdown)} 
        className='menu-tabs'
      >
        {selectedLanguage?.name} {languageDropdown ? <>&#11205;</> : <>&#11206;</>}
      </button>
      {
        languageDropdown ?
        <ul className='drop-down-container'>
          {(languages as Language[]).map((entry) => (
            <li key={entry.id}>
              <button onClick={() => handleSelect(entry)} className='list-btn'>
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
              <section className='card-item' key={data.id}>
                <FontAwesomeIcon icon={faTrashCan} onClick={() =>  {
                  setModalId(data.id);
                  setDelModalOpen(true);
                  setCurrentConcept(data)
                }}/>
                <FontAwesomeIcon icon={faWrench} onClick={() =>  {
                  setModalId(data.id);
                  setEditModalOpen(true);
                  setCurrentConcept(data);
                }}/>
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
        <div className='silent-modal' onClick={() => {
          setLanguageDropdown(false);
        }}></div>:
        <></>
      }
    </section>
  )
}
