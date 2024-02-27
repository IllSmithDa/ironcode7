/* eslint-disable @typescript-eslint/no-unused-vars */
import { Language } from '../../types';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons/faWrench';
import Modal from '../../components/DarkModal/DarkModal';
import { axiosFetch } from '../../axios';
import Loader from '../../components/Loader/Loader';

export default function DeleteLanguages() {
  const [err, setErr] = useState<string>('');
  const [selected, setSelected] = useState<Language>();
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [languages, setLanguages] = useState<Language []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState<string>('');

  const url = `/api/language/all-languages`;
  const updateUrl = 'api/language/update';

  useEffect(() => {
    if (delModalOpen === false && editModalOpen === false) {
      setSelected(undefined);
    }
  }, [delModalOpen, editModalOpen])

  useEffect(() => {
    // https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/
    const controller = new AbortController();
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosFetch.get(url, { signal: controller.signal})
        if (res.status === 200) {
          // console.log(res.data);
          setLanguages([...res.data.data])
        }
      } catch (err) {
        setErr('Error: Could not connect to database. Contact an administrator for additional support.');
      } finally {
        setIsLoading(false);
        console.log(isLoading);
      }

      return () => controller.abort();
    }
    fetchData();
  }, [url, isLoading]);

  useEffect(() => {
    if (editModalOpen || delModalOpen) {
      const body = document.getElementById('iron-code-body');
      if (body) body.classList.add('modal-open')
    } else {
      const body = document.getElementById('iron-code-body');
      if (body) body.classList.remove('modal-open')
    }
  }, [editModalOpen, delModalOpen])

  const delLanguage = (language: Language) =>{
    const updatedLanguages = languages.filter((entry) => entry.id !== language.id);
    setLanguages([...updatedLanguages]);
  }

  const deleteTopic = async () => {
    try {
      delLanguage(selected as Language);
      const url = `/api/language/delete-id/${selected?.id}`;
      await axiosFetch.delete(url);
      setDelModalOpen(false);
    }catch(err) {
      setErr('Error: Could not delete topic')
    }
  }

  const submitEdits = async () => {
    try {
      const updatedConcept = {
        ...selected,
        description
      }
      
      await axiosFetch.put(updateUrl, updatedConcept);
      setEditModalOpen(false);
      setLanguages((languages) =>  {
        return languages.map((language) => {
          if(language?.id === selected?.id) {
            return {
              ...language,
              description
            }
          } 
          return language
        })
      })

    } catch{
      setErr("Error: Could not update Topic")
    }
  }
  const renderLanguages = (languages as Language []).map((entry) => (
    <section 
      key={entry.id}
      className={`
        bg-[#222] p-[2rem] my-[2rem]
      `}
    >
      <FontAwesomeIcon icon={faTrashCan}
        onClick={() =>  {
          setDelModalOpen(true);
          setSelected(entry)
        }}
        className={`
          float-right text-[2.5rem] hover:text-[#DDD] cursor-pointer 
        `}  
      />
      <FontAwesomeIcon icon={faWrench}
        onClick={() =>  {
          setEditModalOpen(true);
          setDescription(entry.description);
          setSelected(entry); 
        }}
        className={`
          float-right text-[2.5rem] hover:text-[#DDD] mr-[2rem] cursor-pointer
        `}
      />
      <h4 className='text-[2rem] my-[2rem]'>{entry.name}</h4>
      <p>{entry.description}</p>
    </section>
  ))

  return (
    <section
      className={`
        p-[2rem] w-[800px] bg-[#2B2B2B] m-[auto] dark:text-[#FFF] text-[#FFF] relative
      `}
    > 
      {
        isLoading ?
        <Loader />:
        <>
          {renderLanguages}
        </>
      }
      <Modal isOpen={delModalOpen}>
        <section
          className={` 
            p-[2rem] bg-[#444] w-[600px] fixed z-[150] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]
          `}
        
        >
          <FontAwesomeIcon
            icon={faClose}
            onClick={() => setDelModalOpen(false)}
            className={` 
              float-right text-[2.5rem] cursor-pointer hover:text-[#DDD] 
            `}  
          />
          <h4 className='my-[5rem]'>Are yuou sure you want to delete this language: {selected?.name}</h4>
          {
            err ? 
            <p className='error-txt'>{err}</p>:
            <></>
          }
          <section className={`flex gap-[1rem] justify-end`}>
            <button
              onClick={() => setDelModalOpen(false)}
              className={`
                w-[100px] h-[47px] p-[1rem] bg-[#2A2A2A] text-[1.5rem] align-right relative
                hover:bg-[#2E2E2E]
                dark:text-[#FFF] text-[#FFF]
              `}  
            >
              No
            </button>
            <button onClick={() => deleteTopic()}
              className={`
                w-[100px] h-[47px] p-[1rem] bg-[#2A2A2A] text-[1.5rem] align-right relative
                hover:bg-[#2E2E2E]
                dark:text-[#FFF] text-[#FFF]
              `}
            >
              Yes
            </button>
          </section>
        </section>
      </Modal>
      <Modal isOpen={editModalOpen}>
        <section
          className={` 
            p-[2rem] bg-[#444] w-[600px] fixed z-[150] top-[50%] left-[50%]  translate-y-[-50%] translate-x-[-50%]
          `}
        >
          <FontAwesomeIcon
            icon={faClose}
            onClick={() => setEditModalOpen(false)}
            className={` 
              float-right text-[2.5rem] cursor-pointer hover:text-[#DDD] 
            `}
          />
          <h4 className='text-[2rem] my-[2rem]'>Edit: {selected?.name}</h4>
          <section className='form-group'>
            <label className='text-[1.7rem] my-[1rem]'>Concept Text</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`Edit Description of ${selected?.name}`}
              className={`
                w-[100%] h-[300px] my-[1rem] p-[1rem] text-[#FFF] text-[1.5rem] bg-[#222]
              `}
            />   
          </section>
          {
            err ? 
            <p className='error-txt'>{err}</p>:
            <></>
          }
          <section className={`flex gap-[1rem] justify-end`}>
            <button
              onClick={() => setEditModalOpen(false)}
              className={`
                w-[100px] h-[47px] p-[1rem] bg-[#2A2A2A] text-[1.5rem] align-right relative
                hover:bg-[#2E2E2E]
                dark:text-[#FFF] text-[#FFF]
              `}
            >
              Cancel
            </button>
            <button
              onClick={() => submitEdits()}
              className={`
                w-[100px] h-[47px] p-[1rem] bg-[#2A2A2A] text-[1.5rem] align-right relative
                hover:bg-[#2E2E2E]
                dark:text-[#FFF] text-[#FFF]
              `}
            >
              Submit
            </button>
          </section>
        </section>
      </Modal>
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
